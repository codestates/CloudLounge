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
    origin: 'https://cloudlounge.tk',
    credentials: true,
    methods: '*',
  })
)

app.use(cookieParser())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter)

app.listen(PORT, () => console.log(`      🚀 Server is runnning on PORT:${PORT}`))

// sequelize 명령어

// migration
// npx sequelize-cli db:migrate
// npx sequelize-cli db:migrate:undo:all

// seed
// npx sequelize-cli db:seed:all
// npx sequelize-cli db:seed:undo:all
