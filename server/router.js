const router = require('express');
const jwt = require('express-jwt');

const checkToken = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: process.env.AUTH0_CLIENT_SECRET,
  // Validate the audience and the issuer.
  // audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['HS256']
});

const selectiveMiddlewareApply = function(path, middleware) {
  return function(req, res, next) {
    if (path.has(req.path)) {
      return next();
    } else {
      return middleware(req, res, next);
    }
  };
};

const api_router = router();
api_router.use('/api', selectiveMiddlewareApply(checkToken), require('./api/index'));

module.exports = api_router;
