const { tokenVerify } = require('../token')
const { comment } = require('../../models')

module.exports = (req, res) => {
  const { loungeId, rating, contents } = req.body
  console.log(loungeId, rating, contents)
  const tokenData = tokenVerify(req)
  console.log('tokenData:', tokenData)
  const { id } = tokenData
  // error 처리
  if (!loungeId || !rating || !contents) {
    return res.status(400).send({ message: 'missing info' })
  }

  comment
    .create({
      userId: id,
      contents,
      loungeId,
      rating,
    })
    .then((data) => {
      console.log(data.dataValues)
      return res.status(201).send({ message: 'created' })
    })
    .catch((err) => console.log(err))
}
