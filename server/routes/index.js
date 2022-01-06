const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const oauthRouter = require('./oauth')

router.use('/user', userRouter)
router.use('/oauth', oauthRouter)

module.exports = router
