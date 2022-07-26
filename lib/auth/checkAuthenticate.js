const checkAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

const checkNotAuthenticated = (req, res, next) => {
  if(req.isAuthenticated()){
    return req.redirect('/');
  }
  next();
}

module.exports = {
  checkAuthenticated,
  checkNotAuthenticated
}