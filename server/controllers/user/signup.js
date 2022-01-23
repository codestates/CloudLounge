const { user } = require('../../models')
const bcrypt = require('bcrypt')

module.exports = (req, res) => {
  const { email, username, password } = req.body
  if (!email || !username || !password) {
    return res.status(400).send({ message: 'not enough user info' })
  }
  //Todo: bcrypt를 이용해서 비밀번호를 암호화 한 뒤 db에 삽입할 것.
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.log(err)
      return res.status(500).send({ message: 'bcrypt error' })
    } else {
      console.log('\n💬hash:', hash)

      user
        .findOrCreate({
          where: { email },
          defaults: { username, password: hash },
        })
        .then(([data, created]) => {
          if (!created) {
            console.log('😰 error: email exist!')
            return res.status(409).send({ message: 'email exist' })
          } else {
            console.log('\n💬 data.dataValues:', data.dataValues)
            return res.status(201).send({ message: 'created' })
          }
        })
        .catch((err) => {
          console.log(err)
          return res.status(500).send({ message: 'query error' })
        })
    }
  })
}
