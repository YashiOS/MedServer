const express = require('express')
const morgan = require('morgan')
const createError = require('http-errors')
require('dotenv').config()
require('./Helpers/init_mongoDb')
const { verifyAccessToken } = require('./Helpers/jwt_token')
const AuthRoute = require('./Routes/AuthRoutes')   

const app = express();

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', verifyAccessToken ,async(req, res, next) => {
    res.send('Verified token')
})

app.use('/auth', AuthRoute)

app.use(async (req, res, next) => {
   next(createError.NotFound())
})

app.use(async (err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,

        }
    })
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('Server Started and running now on port ${PORT}.')
})

