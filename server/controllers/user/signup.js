const { user } = require('../../models')

module.exports = (req, res) => {
  const { email, username, password } = req.body
  if (!email || !username || !password) {
    return res.status(400).send({ message: 'not enough user info' })
  }
  user
    .findOrCreate({
      where: { email },
      defaults: { username, password },
    })
    .then(([data, created]) => {
      if (!created) {
        return res.status(409).send({ message: 'email exist' })
      } else {
        console.log(data.dataValues)
        return res.status(201).send({ message: 'created' })
      }
    })
}

// const admin = user.create({
//   email: 'admin',
//   username: 'admin',
//   password: 'admin',
//   oauth: 0,
//   admin: 1,
// })
