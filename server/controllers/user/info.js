const { user } = require('../../models')

module.exports = {
  get: async (req, res) => {
    const test = await user
      .findOne({
        where: { email: 'kimchulsu@test.com' },
      })
      .catch((err) => res.json(err))

    res.status(200).send({ data: test, message: 'ok' })
  },
  patch: (req, res) => {},
}
