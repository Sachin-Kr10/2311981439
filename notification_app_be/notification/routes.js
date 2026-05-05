const express = require('express')
const router = express.Router()
const controller = require('./notification.controller')
const auth = require('../../middleware/auth.middleware')

router.post('/', controller.create)
router.get('/', auth, controller.getAll)
router.patch('/:id/read', auth, controller.markRead)
router.patch('/read-all', auth, controller.markAllRead)
router.delete('/:id', auth, controller.remove)

module.exports = router