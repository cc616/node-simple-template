const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('../config')

const auth = require('./auth')

// 注册路由
const router = express.Router()

// Authorization
router.use((req, res, next) => {
  const url = req.originalUrl
  const token = req.headers.authorization
  if (url === '/api/user/login' && !req.headers.authorization) {
    next()
  } else {
    if (!token) {
      res.status(401).json({
        message: 'invalid token',
        error: 'UnauthorizedError'
      })
    } else {
      const secretKey = config.secretKey
      jwt.verify(token, secretKey, function(err, decoded) {
        if (err) {
          console.log(err)
          res.status(401).json({
            message: 'invalid token',
            error: 'UnauthorizedError'
          })
        } else {
          next()
        }
      })
    }
  }
})

router.use('/', auth)

// 处理 404 
router.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// 处理500错误
router.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    message: err.message,
    data: {},
    code: err.status && err.status.toString() || '500'
  })
})

module.exports = router