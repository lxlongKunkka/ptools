require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// 导入路由（后续创建）
const translateRouter = require('./routes/translate')
const codeRouter = require('./routes/code')
const solutionRouter = require('./routes/solution')
const errorRouter = require('./routes/error')

const app = express()
const port = process.env.PORT || 3000

// 中间件
app.use(cors()) // 允许跨域
app.use(bodyParser.json()) // 解析JSON请求

// 注册路由
app.use('/api/translate', translateRouter)
app.use('/api/generate-code', codeRouter)
app.use('/api/generate-solution', solutionRouter)
app.use('/api/check-error', errorRouter)

// 启动服务
app.listen(port, () => {
  console.log(`后端服务运行在 http://localhost:${port}`)
})