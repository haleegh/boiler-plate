const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExp : {
    type: Number
  }
})

// userSchema를 이용해 'User'라는 네임의 모델 생성
const User = mongoose.model('User', userSchema)

// 다른 곳에서도 쓸 수 있게 익스폴츠
module.exports = { User }