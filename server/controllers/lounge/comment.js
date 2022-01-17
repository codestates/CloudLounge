const { tokenVerify } = require('../token')
const { comment } = require('../../models')
const { lounge } = require('../../models')

module.exports = (req, res) => {
  const { loungeId, rating, contents } = req.body
  console.log(loungeId, rating, contents)
  const tokenData = tokenVerify(req)
  console.log('tokenData:', tokenData)
  const { id } = tokenData
  // error 처리
  if (!loungeId || !rating || !contents) {
    return res.status(400).send({ message: 'missing info' })
  }

  comment
    .create({
      userId: id,
      contents,
      loungeId,
      rating,
    })
    .then((data) => {
      console.log(data.dataValues)
      comment
        .findAll({
          where: { loungeId },
          attributes: ['rating'],
        })
        .then((data) => {
          // 평균별점 계산
          const arrayData = data.map((element) => element.dataValues.rating)
          console.log(arrayData)
          const number = arrayData.length
          console.log('개수 :', number, '개')
          const sum = arrayData.reduce((acc, cur) => acc + cur)
          console.log('총합:', sum)
          const avg = sum / number
          const avgRating = Math.round(avg * 10) / 10
          console.log('평균:', avg)
          console.log('별점평균:', avgRating)

          // 라운지 avgRating에 평균별점 반영
          lounge
            .update({ avgRating }, { where: { id: loungeId } })
            .then((data) => {
              console.log(data)
              return res.status(201).send({ message: 'created' })
            })
            .catch((err) => console.log(err))
        })
    })

    .catch((err) => console.log(err))
}
