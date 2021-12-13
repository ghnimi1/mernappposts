const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const auth = require('../middleware/auth')

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/current', auth, authController.getAuthUser);
router.get('/', auth, authController.getAllUser);
router.get('/:id', auth, authController.getUser);

module.exports = router