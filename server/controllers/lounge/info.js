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
        where: {
          id: req.params.loungeId,
        },
        include: {
          model: comment,
          require: true,
          where: {
            loungeId: req.params.loungeId,
          },
        },
      })
      .then((data) => {
        const { image, address, avgRating } = data.dataValues
        const comments = data.dataValues.comments.map((element) => {
          return {
            userId: element.dataValues.userId,
            contents: element.dataValues.contents,
            rating: element.dataValues.rating,
            createdAt: element.dataValues.createdAt,
          }
        })
        console.log(comments)
        return res.status(200).send({ data: { image, address, avgRating, comments } })
      })
      .catch((err) => {
        console.log(err)
        return res.status(400).send({ message: 'not enough information' })
      })
  },
}
