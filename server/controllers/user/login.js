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
      // console.log('어드민 정보 불러오기 용입니다', data.dataValues.admin)

      const accessToken = tokenSign(data.dataValues)
      const { admin } = data.dataValues

      console.log('      🔑 accessToken: ', accessToken)

      return res.send({ data: { accessToken, admin }, message: 'login success' })
    })
}
