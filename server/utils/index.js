  const notFound = (req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
};

const debugReq = (req, res, next) => {
  debug("params:", req.params);
  debug("query:", req.query);
  debug("body:", req.body);
  next();
};

module.exports = {
  notFound,
  debugReq
};
