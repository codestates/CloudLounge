require('dotenv').config()
const axios = require('axios')

const naverClientID = process.env.NAVER_CLIENT_ID
const naverClientSecret = process.env.NAVER_CLIENT_SECRET

module.exports = async (req, res) => {
  //Todo: 네이버 토큰 => 받아온 데이터로 회원가입 => 로그인 토큰 생성 => 생성된 토큰, 유저정보를 클라이언트로 보내줘야 함.
  //? 코드가 길어질 것 같은데 그럼 프라미스 헬이 될 것 같음 aync await으로 작성해야 하지 않을까?
  // 가입 완료 후에
  // 서버에서 새로 만든 jwt토큰이랑 유저 정보(email, username)를 같이 보내야 함
  console.log('💬 req.body:', req.body, '\n')
  if (!req.body) {
    console.log('no code and state in request body')
    return res.status(401).send({ message: 'no code and state' })
  }
  const naverUrl = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${naverClientID}&client_secret=${naverClientSecret}&code=${req.body.authorizationCode}&state=${req.body.authorizationState}`

  //? 토큰발급 => 클라이언트에서 받은 code와 state를 이용해서 네이버 oauth 서버에서 token 받아오는 요청
  const tokenIssuance = await axios //
    .get(naverUrl)
    .catch((err) => console.log(err))

  console.log('💬 tokenIssuance:', tokenIssuance.data, '\n')

  if (!tokenIssuance.data) {
    console.log('no token issuance data')
    return res.status(401).send({ message: 'no code and state' })
  }

  const { access_token } = tokenIssuance.data

  //? 네이버 oauth 서버에서 받아온 token을 이용해 네이버 openapi 서버에 유저 정보를 요청
  const getData = await axios({
    method: 'get',
    url: 'https://openapi.naver.com/v1/nid/me',
    headers: {
      Authorization: `Bearer ${tokenIssuance.data.access_token}`,
    },
  }).catch((err) => console.log(err))

  console.log('💬 getData:', getData.data, '\n')

  const { email, nickname } = getData.data.response
  // console.log(email, nickname, access_token)
  //Todo: 받아온 email, nickname, token을 가지고 회원가입 => 로그인 => 생성된 토큰을 클라이언트로 보내줘야 함
}
