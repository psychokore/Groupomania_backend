const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const likeCtrl = require('../controllers/like');


router.post('/:id', auth, likeCtrl.addLike);
router.delete('/:id', auth, likeCtrl.deleteLike);
router.get('/:id', auth, likeCtrl.getAllLikes);

module.exports = router;