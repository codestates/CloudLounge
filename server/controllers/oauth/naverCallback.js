require('dotenv').config()
const axios = require('axios')
const { user } = require('../../models')
const { tokenSign } = require('../token')

const naverClientID = process.env.NAVER_CLIENT_ID
const naverClientSecret = process.env.NAVER_CLIENT_SECRET

module.exports = async (req, res) => {
  // Todo: 네이버 토큰서버에 클라이언트로 받은 code와 state를 이용해서 네이버 token을 받아옴 => 받아온 토큰으로 네이버 oauth 서버에 유저 정보를 요청  => 받아온 유저정보로 회원가입 => 로그인 토큰 생성 => 생성된 토큰과 유저정보를 클라이언트로 응답
  console.log('\n💬 req.body:', req.body, '\n')

  if (!req.body) {
    console.log('no code and state in request body')
    return res.status(400).send({ message: 'Code and state do not exist' })
  }

  const naverUrl = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${naverClientID}&client_secret=${naverClientSecret}&code=${req.body.authorizationCode}&state=${req.body.authorizationState}`

  //? 토큰발급 => 클라이언트에서 받은 code와 state를 이용해서 네이버 oauth 서버에서 token 받아오는 요청
  const tokenIssuance = await axios //
    .get(naverUrl)
    .catch((err) => console.log(err))

  console.log('\n💬 tokenIssuance:', tokenIssuance.data, '\n')

  if (!tokenIssuance.data) {
    console.log('no token issuance data')
    return res.status(401).send({ message: 'Failed to issue naver access token' })
  }

  const { access_token } = tokenIssuance.data

  //? 네이버 oauth 서버에서 받아온 token을 이용해 네이버 openapi 서버에 유저 정보를 요청
  const getData = await axios({
    method: 'get',
    url: 'https://openapi.naver.com/v1/nid/me',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }).catch((err) => console.log(err))

  //! naver 오류 API 문서에 오류 메시지 기입할 것!
  console.log('\n💬 getData:', getData, '\n')
  if (!getData) {
    return res.status(400).send({ message: 'Authentication failed' })
  }
  console.log('\n💬 getData.data:', getData.data, '\n')

  const { email, nickname } = getData.data.response
  console.log(email, nickname, access_token)

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
            message: 'naver social login success',
          })
        })
      } else {
        //! 소셜로그인 가입이 안 되어 있음, 가입과 동시에 로그인 해주면서 토큰 생성 => 생성된 토큰과 oauth여부를 클라이언트로 response
        console.log('\n👍 email created', '\n')

        delete data.dataValues.password

        const cloudloungeAccessToken = tokenSign(data.dataValues) // 토큰생성
        console.log('\n🔑 cloudloungeAccessToken: ', cloudloungeAccessToken, '\n')

        return res.status(200).send({
          data: { accessToken: cloudloungeAccessToken, oauth: true },
          message: 'naver social login success',
        })
      }
    })
}
