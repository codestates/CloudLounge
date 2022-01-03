const { user } = require('../../models')

module.exports = (req, res) => {
  const { email, username, password } = req.body
  if (!email || !username || !password) {
    res.status(400).send({ message: 'not enough user info' })
  }
  user
    .findOrCreate({
      where: { email },
      defaults: {
        username,
        password,
      },
    })
    .then(([data, created]) => {
      if (!created) {
        res.status(409).send({ message: 'email exist' })
      } else {
        console.log(data.dataValues)
        res.status(201).send({ message: 'created' })
      }
    })
}
