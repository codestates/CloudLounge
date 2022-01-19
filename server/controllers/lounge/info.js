const { lounge } = require('../../models')
const { comment } = require('../../models')
const { user } = require('../../models')

module.exports = {
  all: (req, res) => {
    lounge
      .findAll({
        attributes: ['id', 'address'],
      })
      .then((data) => {
        console.log(data)
        return res.status(200).send({ data: data })
      })
  },

  particular: (req, res) => {
    console.log('   loungeId:', req.params.loungeId)

    lounge
      .findOne({
        where: { id: req.params.loungeId },
      })
      .then((data) => {
        const { image, address, avgRating } = data.dataValues
        comment
          .findAll({
            where: { loungeId: req.params.loungeId },
            attributes: ['userId', 'contents', 'rating', 'createdAt'],
            include: {
              model: user,
              require: true,
            },
          })
          .then((data) => {
            const comments = data.map((element) => {
              return {
                username: element.user.dataValues.username,
                contents: element.dataValues.contents,
                rating: element.dataValues.rating,
                createdAt: element.dataValues.createdAt,
              }
            })
            console.log('\n💬 comments:', comments)

            return res.status(200).send({
              data: { image, address, avgRating, comments },
            })
          })
      })
      .catch((err) => {
        console.log(err)
        return res.status(400).send({ message: 'not enough information' })
      })
  },
}
