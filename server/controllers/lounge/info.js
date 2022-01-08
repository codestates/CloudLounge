const { lounge } = require('../../models')
const { comment } = require('../../models')

module.exports = {
  all: (req, res) => {
    lounge
      .findAll({
        attributes: ['id', 'address'],
      })
      .then((data) => {
        console.log(data)
        return res.send({ data: data })
      })
  },

  particular: (req, res) => {
    console.log('   loungeId:', req.params.loungeId)
    lounge
      .findOne({
        where: { id: req.params.loungeId },
      })
      .then((data) => {
        // console.log(data.dataValues)
        const { image, address, avgRating } = data.dataValues
        comment
          .findAll({
            where: { loungeId: req.params.loungeId },
            attributes: ['userId', 'contents', 'rating', 'createdAt'],
          })
          .then((data) => {
            // console.log(data)
            const newData = data.map((x) => x.dataValues)
            console.log(newData)
            return res.status(200).send({
              data: { image, address, avgRating, comments: newData },
            })
          })
      })
      .catch((err) => {
        console.log(err)
        return res.status(400).send({ message: 'not enough information' })
      })
  },
}
