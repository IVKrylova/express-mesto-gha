const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');
const { UNAUTHORIZED_CODE } = require('../utils/utils');

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  try {
    const user = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
    req.user = user;
  } catch (err) {
    return res.status(UNAUTHORIZED_CODE).send({ message: 'Необходима авторизация' });
  }

  next();
};
