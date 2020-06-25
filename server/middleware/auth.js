const { User } = require("../models/User");

// 인증 처리
let auth = (req, res, next) => {
  // 클라이언트-쿠키에서 토큰을 가져옴
  let token = req.cookies.user_auth;

  // 토큰찾기 메소드 생성
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    // 유저가 없으면 인증x
    if (!user) return res.json({ isAuth: false, error: true });

    // 유저가 있으면 인증o
    console.log(token);
    req.token = token;
    console.log(user);
    req.user = user;
    // index.js에서 auth미들웨어 이용 후 다음으로 갈 수 있게 써줌
    next();
  });
};

module.exports = { auth };
