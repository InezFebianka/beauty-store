const express = require('express')
const app = express()
const port = 3000
const router = require('./routes/index')
const session = require('express-session')
const qrcode = require('qrcode')

app.set('view engine', 'ejs')
app.use(session({
  secret: 'bismillah ini rahasia',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    sameSite: true
  }
}))

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})