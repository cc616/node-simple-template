const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('../config')

const router = express.Router()

const secretKey = config.secretKey

// 用户登录接口
router.post('/user/login', (req, res) => {
  const opts = req.body
  if (opts.username === 'admin' && opts.password === '123456') {
    const userId = '14564'
    const account = opts.username
    const tokenObj = { user: { userId, account } }
    const token = jwt.sign(tokenObj, secretKey, {
      expiresIn : 60 * 60 * 24 // 授权时效24小时
    })
    res.json({token})
  } else {
    res.status(401).json({
      code: '20001',
      message: '用户名与密码不匹配',
    })
  }
})

module.exports = router