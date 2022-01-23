const router = require('express').Router()
const { adminController } = require('../controllers')

router.get('/', adminController.index)
router.delete('/:loungeId', adminController.delete)

module.exports = router
