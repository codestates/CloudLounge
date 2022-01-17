const { report } = require('../../models')
const { lounge } = require('../../models')
const reportCount = 3 //? 관리자 신고 횟수 지정 변수

module.exports = async (req, res) => {
  // Todo: select loungeId, count(id) as reportNum from reports group by loungeId;
  const data = await report.findAndCountAll({
    group: ['loungeId'],
    include: {
      model: lounge,
      require: true,
    },
  })

  const filteredData = await data.count.filter((el) => {
    //? 신고횟수가 변수인 reportCount(type:number) 이상일 때
    return el.count >= reportCount
  })

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
        filteredData[i]['address'] = data.dataValues.address
      })
  }

  console.log('\n💬 filteredData:', filteredData)
  return res.status(200).send(filteredData)
}
