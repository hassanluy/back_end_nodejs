const express = require('express')
const router = express.Router()
const { check } = require('express-validator')
const { postSignUp, postLogIn} = require('../controller/user-controller')

exports.postAdminSignUp = router.post('/api/signup', [
    check("email", "credintional invaild")
        .isEmail(),
    check("password", "credintional invalid")
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .matches(/\d/)
        .withMessage('Password must contain at least one number'),
    check("username", "credintional invaild")
        .isLength({ min: 5 })
        .withMessage('Username must be at least 5 characters')
], postSignUp)

// login route 
exports.postlogin = router.post('/api/login', postLogIn)