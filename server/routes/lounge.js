const router = require('express').Router()
const { loungeController } = require('../controllers')

router.get('/', loungeController.info.all)
router.get('/info/:loungeId', loungeController.info.particular)
// router.get('/info', loungeController.info.particular)
router.post('/comment', loungeController.comment)
router.post('/report', loungeController.report)

module.exports = router
