const router = require('express').Router()
const {
  loginUser,
  registerUser,
  searchUser,
  updateUser,
  getDashboard
} = require('../controllers/userControllers')

const authenticate = require('../middlewares/authMiddleware')
const project_router = require('../module/project/routes/project_routes')
const task_router = require('../module/project/routes/task_routes')



router.route('/login').post(loginUser)
router.route('/register').post(registerUser)
router.route('/user/search').get(searchUser)
router.put('/user/:id', authenticate, updateUser)
router.get('/user/dashboerd', authenticate, getDashboard)

router.use('/project', authenticate, project_router)
router.use('/task', authenticate, task_router)


module.exports = router
