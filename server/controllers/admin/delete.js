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
      console.log('\nš¬ ė°ģ“ķ°ź°', data, 'ź° ģ­ģ  ėģģµėė¤')
      return res.status(204).send({ message: 'delete complete' })
    })
    .catch((err) => {
      console.log(err)
      return res.status(500).send({ message: 'query error' })
    })
}
