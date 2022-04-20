const { FORBIDDEN_CODE } = require('./utils');

// класс ошибки 403
class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.statusCode = FORBIDDEN_CODE;
  }
}

module.exports = { ForbiddenError };
