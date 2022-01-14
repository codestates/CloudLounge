require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const indexRouter = require('./routes')

const app = express()
const PORT = 80

app.use(
  cors({
    origin: [
      'https://cloudlounge.tk',
      'https://www.cloudlounge.tk',
      'http://localhost:3000',
      'http://cloud-lounge-client.s3-website.ap-northeast-2.amazonaws.com',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS'],
  })
)

app.use(cookieParser())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)

app.listen(PORT, () => console.log(`      🚀 Server is runnning on PORT:${PORT}\n`))
