const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')

const app = express()
const port = 8000

// allow custom header and CORS
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With, Origin')
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')

  if (req.method === 'OPTIONS') {
    res.sendStatus(200) // 让options请求快速返回
  } else {
    next()
  }
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse application/json
app.use(bodyParser.json())

// 日志中间件
const logger = (req, res, next) => {
  console.log('LOGGED')
  next()
}

app.use(logger)

// 所有的路由会加上“／api”前缀
app.use('/api', router) // 添加router中间件

// 静态资源目录
app.use('/static', express.static(__dirname + '/static'))

app.listen(port, () => console.log(`app listening on port ${port}!`))