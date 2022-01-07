module.exports = {
  userController: {
    signup: require('./user/signup'),
    login: require('./user/login'),
    logout: require('./user/logout'),
    info: require('./user/info'),
    delete: require('./user/delete'),
  },
  oauthController: {
    naverCallback: require('./oauth/naverCallback'),
    kakaoCallback: require('./oauth/kakaoCallback'),
  },
  loungeController: {
    info: require('./lounge/info'),
    comment: require('./lounge/comment'),
    report: require('./lounge/report'),
  },
}
