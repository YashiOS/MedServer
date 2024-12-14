const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const User = require('../Models/UserModel')
const createResponse = require('../Models/ResponseModel')

const { authScheme } = require('../Helpers/Validation_Schemes')
const { signAccessToken, signRefreshToken } = require('../Helpers/jwt_token')

router.post('/register', async (req, res, next) => {
    try {
       const result = await authScheme.validateAsync(req.body)
       const doesExist = await User.findOne({ email:result.email })
       if (doesExist) throw createError.Conflict(`${result.email} is already registered`)

       const user = new User(result)

       const savedUser = await user.save()
       const accessToken = await signAccessToken(savedUser.id)
       res.status(201).send(createResponse(201, 'User registered successfully',accessToken , savedUser));
    } catch (error) {
        if (error.isJoi === true) error.status = 422
        next(error)
    }
})

router.post('/login', async(req, res, next) => {
    try {
  const result = await authScheme.validateAsync(req.body)
  const user = await User.findOne({email: result.email})

  if (!user) throw createError.NotFound('User not found')
    const isMatch = await user.isValidPassword(result.password)
if (!isMatch) throw createError.Unauthorized('UserName/password isnt matching')
    const accessToken = await signAccessToken(user.id)
  res.status(200).send(createResponse(200, "Login Successfully", accessToken))
} catch (error) {
    if (error.isJoi === true) return next(createError.BadRequest("Invalid Email/Password"))
        next(error)
    }
})

router.post('/refresh-token', async (req, res, next) => {
    res.send('Token Refreshed')
})

router.delete('/logout', async(req, res, next) => {
    res.send('Logout Route called')
})










module.exports = router
