module.exports = {
  userController: {
    signup: require('./user/signup'),
    login: require('./user/login'),
    logout: require('./user/logout'),
    info: require('./user/info'),
    delete: require('./user/delete'),
  },
}
