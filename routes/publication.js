const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const publicationCtrl = require('../controllers/publication');

router.post('/', auth, multer, publicationCtrl.publish);

module.exports = router;