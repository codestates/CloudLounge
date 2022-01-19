const { user } = require('../../models')
const { tokenVerify } = require('../token')

module.exports = (req, res) => {
  const tokenData = tokenVerify(req)

  //? 토큰 값이 없을 때
  if (!tokenData) {
    console.log('😰 error: No token in req.headers.authorization')
    return res.status(401).send({
      message: 'not authorized',
    })
  }
  const { email } = tokenData
  user
    .destroy({ where: { email } }) //
    .then((result) => {
      console.log(result)
      //? 데이터 베이스에 해당하는 유저 정보가 없을 때(or 이미 회원이 삭제되었을 때)
      if (!result) {
        console.log('😰 error: No data corresponding to the database')
        return res.status(404).send({
          message: 'not found',
        })
      }
      return res.status(204).send({ message: 'delete complete' })
    })
    .catch((err) => {
      console.log(err)
    })
}
