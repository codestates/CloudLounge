module.exports = (req, res) => {
  console.log('this is report')
  res.send('report')
  console.log(req.body)
}
