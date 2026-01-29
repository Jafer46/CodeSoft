const router = require('express').Router()

const {createTask, deleteTask, getProjectTasks, getUserTasks, updateTask} = require('../controllers/task_controllers')

router.post('/', createTask)
router.get('/project/:id', getProjectTasks)
router.get('/task', getUserTasks)
router.put('/:id', updateTask)
router.delete('/:id', deleteTask)

module.exports = router