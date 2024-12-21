const express = require('express');
const { loginUser } = require('../controllers/auth/login');
const { resetPassword, requestPasswordReset } = require('../controllers/auth/forgotPassword');

const router = express.Router();


router.post('/login',loginUser)
router.post('/forgot-password',requestPasswordReset )
router.post('/reset-password',resetPassword)


module.exports = router;
