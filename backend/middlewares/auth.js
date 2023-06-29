const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
const { Unauthorized } = require('../utils/responsesErrors/Unauthorized');

const handleError = (req, res, next) => {
  next(new Unauthorized('С токеном что-то не так'));
};

module.exports = function uathMiddleware(req, res, next) {
  const { authorization } = req.headers;
  let payload;

  if (!authorization || !authorization.startsWith('Bearer ')) return handleError(req, res, next);

  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      return handleError(req, res, next);
    }
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev');
  } catch (err) {
    return handleError(req, res, next);
  }

  req.user = payload;

  return next();
};
