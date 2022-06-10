const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');

router.post('/', auth, multer, commentCtrl.publish);

module.exports = router;