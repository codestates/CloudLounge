const router = require('express').Router()
const { oauthController } = require('../controllers')

router.post('/naverCallback', oauthController.naverCallback)
router.post('/kakaoCallback', oauthController.kakaoCallback)

module.exports = router
