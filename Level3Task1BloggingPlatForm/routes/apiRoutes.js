const router = require('express').Router()
const { createUser, loginUser } = require('../controllers/userControllers')
const { createBlog } = require('../controllers/blogControllers')
const upload = require('../middleware/multer')

router.route('/user/create').post(createUser)
router.route('/user/login').post(loginUser)
router.post('/blog/create', upload.single('image'), createBlog)

module.exports = router
