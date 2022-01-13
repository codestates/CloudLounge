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
      delete data.dataValues.password
      // console.log('rm pwd data: ', data.dataValues)
      const { admin } = data.dataValues
      const accessToken = tokenSign(data.dataValues)
      console.log('      🔑 accessToken: ', accessToken)

      return res.send({ data: { accessToken, admin }, message: 'login success' })
    })
}
