const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const publicationCtrl = require('../controllers/publication');

router.get('/', auth, publicationCtrl.getAllPublications);
router.post('/', auth, multer, publicationCtrl.publish);
router.get('/:id', auth, publicationCtrl.getOnePublicationByPostId);
router.put('/:id', auth, multer, publicationCtrl.modifyPublication);
router.delete('/:id', auth, publicationCtrl.deletePublication);



module.exports = router;