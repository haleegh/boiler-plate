const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = 5000;

const config = require("./config/key");
const { User } = require("./models/User");
const { auth } = require("./middleware/auth");

// application/x-www-form-urlencoded 타입의 데이터를 갖고 오기 위함
app.use(bodyParser.urlencoded({ extended: true }));
// application/json 타입의 데이터를 갖고 오기 위함
app.use(bodyParser.json());
// 쿠키파서 사용
app.use(cookieParser());

mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log("Error Message", err));

// Routes
app.get("/", (req, res) => res.send("Hello World!"));

app.post("/api/user/register", (req, res) => {
  const user = new User(req.body);
  // save하기전 password 암호화 -> User.js
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    // client에 userInfo를 전달
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/api/user/login", (req, res) => {
  // 요청된 이메일이 db에 있는지 찾기 , mongodb methods : findOne
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다.",
      });
    }
    // 요청된 이메일이 db에 있다면 -> 비밀번호가 같은지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      // User모델에서 comparePassword메소드 만들기
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      // 비밀번호까지 맞다면 token 생성 -> jsonwebtoken 라이브러리 사용
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        // cookie, localstorage 등 장소를 선정해서 토큰 저장
        res
          .cookie("user_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

// 토큰 -- decoding(복호화) --> 유저 인증(Auth), auth라는 미들웨어 추가
app.get("/api/user/auth", auth, (req, res) => {
  // 여기까지 미들웨어를 통과 -> authentication == true
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

// 로그아웃할려는 유저의 토큰을 지워줌 -> 인증이 풀리면서 자연스럽게 로그아웃 됨
app.get("/api/user/logout", auth, (req, res) => {
  // 미들웨어에서 _id를 찾아옴
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({ success: true });
  });
});

app.listen(port, () => console.log(`App listening on port ${port}`));
