const express = require('express');
const router = express.Router();
const auth = require ('../middleware/auth')

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/refresh', auth, userCtrl.refresh);
router.get('/data', auth, userCtrl.getUserData);
router.delete('/delete', auth, userCtrl.deleteAccount);
router.put('/update', auth, userCtrl.updateUserData)

module.exports = router;