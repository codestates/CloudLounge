const { tokenVerify } = require('../token')
const { report } = require('../../models')

module.exports = (req, res) => {
  const { loungeId, radioBoxId, contents } = req.body
  console.log(loungeId, radioBoxId, contents)
  const tokenData = tokenVerify(req)
  console.log(tokenData)
  const { id } = tokenData
  // error 처리
  if (!loungeId || !radioBoxId) {
    return res.status(400).send({ message: 'invalid information' })
  } else if (radioBoxId === 3) {
    if (!contents) {
      console.log('   error: radioBoxId가 3 일 때  내용이 없다면?')
      return res.status(400).send({ message: 'invalid information' })
    }
  } else if (radioBoxId === 1 || radioBoxId === 2) {
    if (contents) {
      console.log('   error: radioBoxId가 1 또는 2 일 때  내용이 있다면?')
      return res.status(400).send({ message: 'invalid information' })
    }
  }
  report
    .create({
      radioBoxId,
      contents,
      userId: id,
      loungeId,
    })
    .then((data) => {
      console.log(data.dataValues)
      return res.status(200).send({ message: 'created' })
    })
    .catch((err) => console.log(err))
}
