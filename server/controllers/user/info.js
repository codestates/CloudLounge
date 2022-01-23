const { user } = require('../../models')
const { tokenVerify } = require('../token')
const bcrypt = require('bcrypt')

module.exports = {
  //Todo: 회원정보 조회
  get: (req, res) => {
    //? 토큰 해독
    const tokenData = tokenVerify(req)

    //? 토큰을 해독한 데이터 값이 없을 때
    if (!tokenData) {
      console.log('😰 error: No token in req.headers.authorization')
      return res.status(401).send({ message: 'not authorized' })
    } else {
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
          } else {
            const { email, username, admin } = data.dataValues
            console.log(data.dataValues)
            return res.status(200).send({ data: { email, username, admin } })
          }
        })
        .catch((err) => {
          console.log(err)
          return res.status(500).send({ message: 'query error' })
        })
    }
  },

  //Todo: 회원정보 수정
  patch: (req, res) => {
    console.log('\n💬 req.body', req.body)
    console.log('\n💬 req.headers.authorization:', req.headers.authorization)
    //? 토큰 해독
    const tokenData = tokenVerify(req)

    //? 토큰을 해독한 데이터 값이 없을 때
    if (!tokenData) {
      console.log('😰 error: No token in req.headers.authorization')
      return res.status(401).send({ message: 'not authorized' })
    } else {
      const { username, curPassword, newPassword } = req.body
      const { email } = tokenData
      console.log('\n💬 email:', email)

      user
        .findOne({ where: { email } })
        .then((data) => {
          if (!data) {
            console.log('😰 error: invalid password')
            return res.status(401).send({ message: 'invalid password' })
          } else {
            console.log('\n💬 data.dataValues', data.dataValues)
            const hash = data.dataValues.password
            // 비밀번호 일치여부 확인
            bcrypt.compare(curPassword, hash, (err, result) => {
              if (err) {
                console.log(err)
                return res.status(500).send({ message: 'bcrypt error' })
              } else {
                console.log('\n💬 비밀번호 일치여부:', result)
                if (!result) {
                  // 비밀번호 불일치
                  return res.status(401).send({ message: 'not authorized' })
                } else {
                  // 비밀번호 일치
                  //Todo: 변경할 비밀번호(newPassword)를 bcrypt hash 메서드를 이용해서 암호화하고 newHash 변수에 할당
                  bcrypt.hash(newPassword, 10, (err, newHash) => {
                    if (err) {
                      console.log(err)
                      return res.status(500).send({ message: 'bcrypt error' })
                    } else {
                      console.log('\n💬 newHash:', newHash)
                      // 변경된 정보 db에 update
                      user
                        .update({ username, password: newHash }, { where: { email } })
                        .then((data) => {
                          console.log('\n💬 data:', data)
                          return res.status(200).send({ message: 'patch ok' })
                        })
                        .catch((err) => {
                          console.log(err)
                          return res.status(500).send({ message: 'query error' })
                        })
                    }
                  })
                }
              }
            })
          }
        })
        .catch((err) => {
          console.log(err)
          return res.status(500).send({ message: 'query error' })
        })
    }
  },
}
