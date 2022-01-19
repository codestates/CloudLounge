const { user } = require('../../models')
const { tokenVerify } = require('../token')

module.exports = {
  //Todo: 회원정보 조회
  get: (req, res) => {
    //? 토큰 해독
    const tokenData = tokenVerify(req)

    //? 토큰을 해독한 데이터 값이 없을 때
    if (!tokenData) {
      console.log('😰 error: No token in req.headers.authorization')
      return res.status(401).send({ message: 'not authorized' })
    }
    const { email } = tokenData
    user
      .findOne({ where: { email } }) //
      .then((data) => {
        //? 데이터 베이스에 해당하는 유저 정보가 없을 때
        if (!data) {
          console.log(
            '😰 error: There is no user information corresponding to the database'
          )
          return res.status(404).send({ message: 'not found' })
        }
        const { email, username, admin } = data.dataValues
        console.log(data.dataValues)
        return res.status(200).send({ data: { email, username, admin } })
      })
  },

  //Todo: 회원정보 수정
  patch: (req, res) => {
    console.log('req.body', req.body)
    console.log('req.headers', req.headers)
    //? 토큰 해독
    const tokenData = tokenVerify(req)

    //? 토큰을 해독한 데이터 값이 없을 때
    if (!tokenData) {
      console.log('😰 error: No token in req.headers.authorization')
      return res.status(401).send({ message: 'not authorized' })
    }
    const { username, curPassword, newPassword } = req.body
    const { email } = tokenData
    console.log(email)
    user
      .findOne({ where: { email: email, password: curPassword } }) //
      .then((data) => {
        //? 현재 사용중인 비밀번호가 틀렸음
        if (!data) {
          console.log('😰 error: invalid password')
          return res.status(401).send({ message: 'invalid password' })
        }
        console.log(data.dataValues)
        user
          .update({ username, password: newPassword }, { where: { email } })
          .then((result) => {
            console.log(result)
            return res.status(200).send({ message: 'patch ok' })
          })
          .catch((err) => {
            console.log(err)
          })
      })
  },
}
