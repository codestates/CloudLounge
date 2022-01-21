const { tokenVerify } = require('../token')
const { report } = require('../../models')

module.exports = (req, res) => {
  const { loungeId, radioBoxId, contents } = req.body
  const tokenData = tokenVerify(req)
  console.log('\n💬 tokenData:', tokenData)
  const { id } = tokenData

  // error 처리
  if (!loungeId || !radioBoxId) {
    return res.status(400).send({ message: 'invalid information' })
  } else if (radioBoxId === 3) {
    if (!contents) {
      console.log('😰 error: radioBoxId가 3 인데 내용이 없음')
      return res.status(400).send({ message: 'invalid information' })
    }
  } else if (radioBoxId === 1 || radioBoxId === 2) {
    if (contents) {
      console.log('😰 error: radioBoxId가 1 또는 2 인데 내용이 있음')
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
      console.log('\n💬 data.dataValues:', data.dataValues)
      return res.status(201).send({ message: 'created' })
    })
    .catch((err) => {
      console.log(err)
      return res.status(500).send({ message: 'query error' })
    })
}
