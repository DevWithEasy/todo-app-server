const {registrationPost, logInPost,getProfile,deleteProfile } = require('../controller/user');
const upload = require('../midleware/upload');
const routers = require('./routers');

const router = require('express').Router();

router.post('/registration',upload.single('avator'),registrationPost)
router.post('/login',logInPost)
router.get('/profile/:id',getProfile)
router.delete('/profile/:id',deleteProfile)

module.exports = router