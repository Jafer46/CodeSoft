const router = require('express').Router()

const {createProject, getUserProjects, updateProject, deleteProject} = require('../controllers/project_controllers')


router.post('/', createProject)
router.get('/user', getUserProjects)
router.put('/:id', updateProject)
router.delete('/:id', deleteProject)



module.exports = router