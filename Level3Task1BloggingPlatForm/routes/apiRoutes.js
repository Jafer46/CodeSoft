const router = require('express').Router()
const { createUser, loginUser } = require('../controllers/userControllers')

router.route('/user/create').post(createUser)
router.route('/user/login').post(loginUser)

module.exports = router
