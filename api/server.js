const express = require('express')

const cors = require('cors')
const helmet = require('helmet')

//routes
const userRouter = require('./auth/users-router')

const server = express()


//middleware
server.use(cors())
server.use(helmet())
server.use(express.json())

server.use('/api/users', userRouter)


module.exports = server