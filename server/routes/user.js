const router = require('express').Router()
const { userController } = require('../controllers')

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.get('/info', userController.info.get)
router.patch('/info', userController.info.patch)
router.delete('/', userController.delete)

module.exports = router
