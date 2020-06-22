const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const { User } = require('./models/User')
const config = require('./config/key')

// application/x-www-form-urlencoded 타입의 데이터를 갖고 오기 위함
app.use(bodyParser.urlencoded({extended: true}))
// application/json 타입의 데이터를 갖고 오기 위함
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('Error Message', err))

// routes
app.get('/', (req, res) => res.send('Hello World!'))
app.post('/register', (req, res) => {

  const user = new User(req.body)
  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err})
    // client에 userInfo를 전달
    return res.status(200).json({
      success: true
    })
  })
})


app.listen(port, () => console.log(`App listening on port ${port}`))

