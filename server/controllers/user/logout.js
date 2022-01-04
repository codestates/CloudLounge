const { user } = require('../../models')
const { tokenVerify } = require('../token')

module.exports = (req, res) => {
  const tokenData = tokenVerify(req)

  //? 토큰 값이 없을 때
  if (!tokenData) {
    console.log('⚠️error: No token in req.headers.authorization')
    return res.status(400).send({
      message: 'logout failed',
    })
  }
  const { email } = tokenData
  user
    .findOne({ where: { email } }) //
    .then((result) => {
      //? 데이터 베이스에 해당하는 유저 정보가 없을 때(이미 회원이 삭제되었을 때)
      if (!result) {
        console.log('⚠️error: No data corresponding to the database.')
        return res.status(400).send({
          message: 'No data corresponding to the database',
        })
      }
      console.log('🔓', result.dataValues.email, '님의 logout이 완료되었습니다')
      return res.status(200).send({ message: 'logout success' })
      //! 클라이언트에서 로컬에 저장된 토큰을 삭제해야함
    })
    .catch((err) => {
      console.log(err)
    })
}
