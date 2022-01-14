const fs = require('fs')
const { lounge } = require('./models')

let lounges = fs.readFileSync('./lounge.csv', 'utf-8')
let info = lounges.split('\r\n')
for (let i = 1; i < info.length; i++) {
  let address = info[i].split(',')[0]
  let image = info[i].split(',')[1]
  lounge.create({
    address: address,
    image: image,
  })
  console.log(i)
}

;`${date.getFullYear()}-${
  date.getMonth() + 1
}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`
