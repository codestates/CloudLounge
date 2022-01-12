const { report } = require('../../models')
const { lounge } = require('../../models')

module.exports = async (req, res) => {
  // Todo: select loungeId, count(id) as reportNum from reports group by loungeId;
  const data = await report.findAndCountAll({
    group: ['loungeId'],
    include: {
      model: lounge,
      require: true,
    },
  })

  const filteredData = data.count.filter((el) => {
    return el.count >= 3 //? 신고횟수가 3회 이상일 때
  })

  console.log('\nfiltered:', filteredData)

  if (filteredData.length === 0) {
    return res.send({ message: 'no report list' })
  }

  for (let i = 0; i < filteredData.length; i++) {
    await lounge
      .findOne({
        attributes: ['address'],
        where: {
          id: filteredData[i].loungeId,
        },
      })
      .then((data) => {
        console.log(data.dataValues.address)
        filteredData[i]['address'] = data.dataValues.address
        console.log(filteredData)
      })
  }
  res.send(filteredData)
}
