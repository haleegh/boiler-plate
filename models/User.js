const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; // 10자리인 솔트를 생성하여 비밀번호를 암호화
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
    // 0이면 일반유저, 1이면 관리자
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

// route에서 save하기 전에 함수 실행
userSchema.pre("save", function (next) {
  // userSchema의 모든 정보 = this 안에 듦
  const user = this;

  // 변경될때만 암호화
  if (user.isModified("password")) {
    // salt를 이용하여 비밀번호 암호화
    bcrypt.genSalt(saltRounds, function (err, salt) {
      // (plain-password(사용자입력값), salt)
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);

        // 유저패스워드를 해시된 패스워드로 바꿔줌
        user.password = hash;
        next();
      });
    });
  } else {
    // 다른거를 바꿀때는 next를 해줘 바로 나갈 수 있게 해줌
    next();
  }
});

// comparePassword 메소드 만들기
userSchema.methods.comparePassword = function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

// 토큰 메소드 만들기
userSchema.methods.generateToken = function (callback) {
  const user = this;
  // jsonwebtoken을 이용해 토큰 생성, toHexString() : 16진수 변환
  const token = jwt.sign(user._id.toHexString(), "secretToken");

  user.token = token;
  user.save(function (err, user) {
    if (err) return callback(err);
    callback(null, user);
  });
};

// 메소드 만들기
userSchema.methods.findByToken = function (token, callback) {
  const user = this;
  // 토큰 복호화
  jwt.verify(token, "secretToken", function (err, decoded) {
    /* decoded = userId를 이용해서 user를 찾은 후
     클라이언트에서 가져온 token = db token 인지 확인 */
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return callback(err);
      callback(null, user);
    });
  });
};

// userSchema를 이용해 'User'라는 네임의 모델 생성
const User = mongoose.model("User", userSchema);

// 다른 곳에서도 쓸 수 있게 익스폴츠
module.exports = { User };
