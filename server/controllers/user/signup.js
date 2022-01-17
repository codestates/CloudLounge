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
        console.log('😰 error: email exist!')
        return res.status(409).send({ message: 'email exist' })
      } else {
        console.log('\n💬 data.dataValues', data.dataValues)
        return res.status(201).send({ message: 'created' })
      }
    })
}
