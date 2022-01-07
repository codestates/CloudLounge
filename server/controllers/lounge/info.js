module.exports = {
  all: (req, res) => {
    console.log('this is all')
    return res.send({ message: 'this is all' })
  },

  particular: (req, res) => {
    // console.log('this is particular')

    console.log(req.params.loungeId)
    console.log(req.query.loungeId)

    return res.send({ message: 'this is particular' })
  },
}
