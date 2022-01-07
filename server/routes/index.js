const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const oauthRouter = require('./oauth')
const loungeRouter = require('./lounge')

router.use('/user', userRouter)
router.use('/oauth', oauthRouter)
router.use('/lounge', loungeRouter)

module.exports = router
