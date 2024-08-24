const router = require('express').Router()
const { createUser, loginUser } = require('../controllers/userControllers')
const { createBlog } = require('../controllers/blogControllers')
const { createComment } = require('../controllers/commentControllers')
const upload = require('../middleware/multer')
const authenticate = require('../middleware/authMiddleware')

router.route('/user/create').post(createUser)
router.route('/user/login').post(loginUser)
router.post('/blog/create', upload.single('image'), createBlog)
router.post('/comment/create', authenticate, createComment)

module.exports = router
