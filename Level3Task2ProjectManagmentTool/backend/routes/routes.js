const router = require('express').Router()
const {
  loginUser,
  registerUser,
  searchUser,
  updateUser
} = require('../controllers/userControllers')
const { createProject } = require('../controllers/projectControllers')
const authenticate = require('../middlewares/authMiddleware')
const {
  createTask,
  getProjectTasks
} = require('../controllers/taskControllers')
router.route('/login').post(loginUser)
router.route('/register').post(registerUser)
router.route('/user/search').get(searchUser)
router.put('/user/:id', authenticate, updateUser)

router.post('/project', authenticate, createProject)

router.post('/task', authenticate, createTask)
router.get('/task/project/:id', authenticate, getProjectTasks)
module.exports = router
