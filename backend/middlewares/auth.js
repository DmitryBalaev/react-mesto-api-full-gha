const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');
const { Unauthorized } = require('../utils/responsesErrors/Unauthorized');

const handleError = (req, res, next) => {
  next(new Unauthorized('С токеном что-то не так'));
};

module.exports = function uathMiddleware(req, res, next) {
  let payload;

  try {
    const token = req.cookies.jwt;
    if (!token) {
      return handleError(req, res, next);
    }
    payload = jwt.verify(token, SECRET);
  } catch (err) {
    return handleError(req, res, next);
  }

  req.user = payload;

  return next();
};
