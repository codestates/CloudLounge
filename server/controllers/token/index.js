require('dotenv').config()
const { sign, verify } = require('jsonwebtoken')

module.exports = {
  tokenSign: (data) => {
    return sign(data, process.env.ACCESS_SECRET)
  },

  tokenVerify: (req) => {
    const authorization = req.headers['authorization']
    if (!authorization) {
      return null
    }
    const token = authorization.split(' ')[1]
    try {
      return verify(token, process.env.ACCESS_SECRET)
    } catch (err) {
      console.log('return null if invalid token')
      console.log(err)
      return null
    }
  },
}
