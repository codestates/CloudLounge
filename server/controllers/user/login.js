const { user } = require('../../models')
const { tokenSign } = require('../token')

module.exports = (req, res) => {
  const { email, password } = req.body
  user
    .findOne({
      where: { email, password },
    })
    .then((data) => {
      if (!data) {
        return res.status(401).send({ message: 'not authorized' })
      }
      // console.log('  data: ', data.dataValues)
      delete data.dataValues.password
      // console.log('rm pwd data: ', data.dataValues)

      const accessToken = tokenSign(data.dataValues)
      console.log('      🔑 accessToken: ', accessToken)

      return res.send({ data: { accessToken }, message: 'login success' })
    })
}
