module.exports = {
  mongoURI : process.env.MONGO_URI
}
// heroku를 통해 배포할 시 사용하므로 헤로쿠에서 설정한 이름과 같아야함 = MONGO_URI