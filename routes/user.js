const express = require('express');
const router = express.Router();
const auth = require ('../middleware/auth')

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/refresh', auth, userCtrl.refresh);

module.exports = router;