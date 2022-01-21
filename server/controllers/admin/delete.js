const { report } = require('../../models')

module.exports = (req, res) => {
  console.log(req.params)
  if (!req.params) {
    res.status(400).send({ message: 'invalid information' })
  }

  report
    .destroy({
      where: {
        loungeId: req.params.loungeId,
      },
    })
    .then((data) => {
      console.log('\n💬 데이터가', data, '개 삭제 되었습니다')
      return res.status(204).send({ message: 'delete complete' })
    })
    .catch((err) => {
      console.log(err)
      return res.status(500).send({ message: 'query error' })
    })
}
