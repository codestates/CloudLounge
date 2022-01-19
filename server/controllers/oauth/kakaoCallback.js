require('dotenv').config()
const axios = require('axios')
const { user } = require('../../models')
const { tokenSign } = require('../token')

const kakaoClientID = process.env.KAKAO_CLIENT_ID
const redirect = process.env.KAKAO_REDIRECT_URL

module.exports = async (req, res) => {
  // Todo: 카카오 토큰서버에 클라이언트로 받은 code를 이용해서 네이버 token을 받아옴 => 받아온 토큰으로 네이버 oauth 서버에 유저 정보를 요청  => 받아온 유저정보로 회원가입 => 로그인 토큰 생성 => 생성된 토큰과 유저정보를 클라이언트로 응답
  console.log('\n💬 req.body:', req.body, '\n')

  if (!req.body) {
    console.log('no code in request body')
    return res.status(400).send({ message: 'Code does not exist' })
  }

  const kakaoUrl = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${kakaoClientID}&redirect_uri=${redirect}&code=${req.body.authorizationCode}`

  //? 토큰발급 => 클라이언트에서 받은 code를 이용해서 카카오 oauth 서버에서 token 받아오는 요청
  const tokenIssuance = await axios //
    .get(kakaoUrl)
    .catch((err) => console.log(err))

  console.log('\n💬 tokenIssuance:', tokenIssuance.data, '\n')

  if (!tokenIssuance.data) {
    console.log('no token issuance data')
    return res.status(401).send({ message: 'Failed to issue kakao access token' })
  }

  const { access_token } = tokenIssuance.data

  //? 카카오 oauth 서버에서 받아온 token을 이용해 카카오 kapi 서버에 유저 정보를 요청
  const getData = await axios({
    method: 'get',
    url: 'https://kapi.kakao.com/v2/user/me',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }).catch((err) => console.log(err))

  console.log('\n💬 getData:', getData, '\n')
  if (!getData) {
    return res.status(400).send({ message: 'Authentication failed' })
  }
  console.log('\n💬 getData.data:', getData.data, '\n')

  const { email } = getData.data.kakao_account
  const { nickname } = getData.data.kakao_account.profile
  console.log('email:', email, '\nnickname:', nickname, '\naccess_token:', access_token)

  // Todo: 받아온 email, nickname, token을 가지고 회원가입
  user
    .findOrCreate({
      where: { email },
      defaults: {
        username: nickname,
        password: access_token,
        oauth: true,
      },
    })
    .then(([data, created]) => {
      console.log('\n💬 data.dataValues', data.dataValues, '\n')

      if (!created) {
        //! 소셜로그인 계정으로 가입되어있음, 로그인은 어떻게? => 받아온 email로 findOne해서 가져온 data로 토큰생성 => 생성된 토큰과 oauth여부 response
        console.log('\n🤔 email exist', '\n')

        user.findOne({ where: { email } }).then((findData) => {
          console.log('\n💬 findData.dataValues', findData.dataValues, '\n')
          delete findData.dataValues.password

          const cloudloungeAccessToken = tokenSign(findData.dataValues) // 토큰 생성
          console.log('\n🔑 cloudloungeAccessToken: ', cloudloungeAccessToken, '\n')

          return res.status(200).send({
            data: { accessToken: cloudloungeAccessToken, oauth: true },
            message: 'kakao social login success',
          })
        })
      } else {
        //! 소셜로그인 가입이 안 되어 있음, 가입과 동시에 로그인 해주면서 토큰 생성 => 생성된 토큰과 oauth여부를 클라이언트로 response
        console.log('\n👍 email created', '\n')

        delete data.dataValues.password

        const cloudloungeAccessToken = tokenSign(data.dataValues) // 토큰 생성
        console.log('\n🔑 cloudloungeAccessToken: ', cloudloungeAccessToken, '\n')

        return res.status(200).send({
          data: { accessToken: cloudloungeAccessToken, oauth: true },
          message: 'kakao social login success',
        })
      }
    })
}
