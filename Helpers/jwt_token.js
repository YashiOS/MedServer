const JWT = require('jsonwebtoken')
const createError = require('http-errors')
const { token } = require('morgan')
const { create } = require('../Models/UserModel')

const secret = process.env.JWT_SECRET || 'yashStartup';

module.exports = {
    signAccessToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
                userId
            }
            const options = {
                  expiresIn: "1h"
            }
            JWT.sign(payload, secret, options, (err,token) => {
                if (err) reject(createError.InternalServerError(err.message))
                    resolve(token)
            })
        })
    },
    verifyAccessToken: (req, res, next) => {
        if (!req.headers['authorization']) return next(createError.Unauthorized('Token not verified'))
            const authHeader = req.headers['authorization']
            const bearerToken = authHeader.split(' ')
            const token = bearerToken[1]
            JWT.verify(token, secret, (err, payload) => {
                if (err) {
                    return next(createError.Unauthorized())
                }
                req.payload = payload
                next()
            })
    },
    signRefreshToken: (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {
                userId
            }
            const options = {
                  expiresIn: "1h"
            }
            JWT.sign(payload, secret, options, (err,token) => {
                if (err) reject(createError.InternalServerError(err.message))
                    resolve(token)
            })
        })
    }
}