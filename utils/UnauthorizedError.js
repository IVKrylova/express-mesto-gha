const { UNAUTHORIZED_CODE } = require('./utils');

// класс ошибки 401
class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = UNAUTHORIZED_CODE;
  }
}

module.exports = { UnauthorizedError };
