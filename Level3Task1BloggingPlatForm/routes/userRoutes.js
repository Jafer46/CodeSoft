const router = require('express').Router();
const { createUser, loginUser } = require('../controllers/userControllers');


router.route('/create').post(createUser);
router.route('/login').post(loginUser);



module.exports = router;