const router = require('express').Router()
const {
  loginUser,
  registerUser,
  searchUser,
  updateUser,
  getDashboard
} = require('../controllers/userControllers')
const {
  createProject,
  getUserProjects
} = require('../controllers/projectControllers')
const authenticate = require('../middlewares/authMiddleware')
const {
  createTask,
  getProjectTasks,
  getUserTasks,
  updateTask
} = require('../controllers/taskControllers')
router.route('/login').post(loginUser)
router.route('/register').post(registerUser)
router.route('/user/search').get(searchUser)
router.put('/user/:id', authenticate, updateUser)
router.get('/user/dashboerd', authenticate, getDashboard)

router.post('/project', authenticate, createProject)
router.get('/project/user', authenticate, getUserProjects)

router.post('/task', authenticate, createTask)
router.get('/task/project/:id', authenticate, getProjectTasks)
router.get('/user/task', authenticate, getUserTasks)
router.put('/task/:id', authenticate, updateTask)
module.exports = router
