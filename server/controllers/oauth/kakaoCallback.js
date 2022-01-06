require('dotenv').config()
const axios = require('axios')

const kakaoClientID = process.env.KAKAO_CLIENT_ID
const redirect = process.env.KAKAO_REDIRECT_URL

module.exports = (req, res) => {
  console.log(req.body)
  res.send({ message: 'hello! kakao' })
}

//Todo: 카카오 토큰 => 받아온 데이터로 회원가입 => 로그인 토큰 생성 => 생성된 토큰, 유저정보를 클라이언트로 보내줘야 함.
//? 코드가 길어질 것 같은데 그럼 프라미스 헬이 될 것 같음 aync await으로 작성해야 하지 않을까?
// 가입 완료 후에
// 서버에서 새로 만든 jwt토큰이랑 유저 정보(email, username)를 같이 보내야 함
