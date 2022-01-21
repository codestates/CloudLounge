const { user } = require('../../models')
const { tokenSign } = require('../token')
const bcrypt = require('bcrypt')

module.exports = (req, res) => {
  const { email, password } = req.body
  //Todo: 클라이언트로부터 받아온 password와 db에 저장된 hash값을 compare하고 일치하면 로그인, 불일치하면 return 401
  if (!email || !password) {
    return res.status(400).send({ message: 'not enough user info' })
  }

  // query
  user
    .findOne({
      where: { email },
    })
    .then((data) => {
      if (!data) {
        return res.status(401).send({ message: 'not authorized' })
      } else {
        console.log('\n💬 data.dataValues:', data.dataValues)
        const hash = data.dataValues.password

        // bcrypt
        bcrypt.compare(password, hash, (err, result) => {
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
              delete data.dataValues.password
              console.log('\n💬delete pwd check:', data.dataValues)
              const { admin } = data.dataValues

              // 토큰 생성(비밀번호 제외)
              const accessToken = tokenSign(data.dataValues)
              console.log('\n🔑 accessToken: ', accessToken, '\n')
              return res
                .status(200)
                .send({ data: { accessToken, admin }, message: 'login success' })
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
