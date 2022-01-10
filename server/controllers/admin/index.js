const { report } = require('../../models')

module.exports = (req, res) => {
  // Todo: select loungeId, count(id) as reportNum from reports group by loungeId;
  report.findAndCountAll()
  res.send('hello world')
}
