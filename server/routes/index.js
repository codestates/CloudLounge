const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const oauthRouter = require('./oauth')
const loungeRouter = require('./lounge')
const adminRouter = require('./admin')

router.use('/user', userRouter)
router.use('/oauth', oauthRouter)
router.use('/lounge', loungeRouter)
router.use('/admin', adminRouter)

module.exports = router
