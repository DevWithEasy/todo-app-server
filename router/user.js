const {registrationPost, logInPost } = require('../controller/user');
const upload = require('../midleware/upload');

const router = require('express').Router();

router.post('/registration',upload.single('avator'),registrationPost)
router.post('/login',logInPost)

module.exports = router