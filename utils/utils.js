/* const BAD_REQUEST_CODE = 400; */
const UNAUTHORIZED_CODE = 401;
const FORBIDDEN_CODE = 403;
const CONFLICT_CODE = 409;
const { NotFoundError } = require('./NotFoundError');

// проверка на поиск по некорректным данным
const checkRes = (res) => {
  if (res === null) {
    throw new NotFoundError('Объект с указанным _id не найден');
  }
  return res;
};

module.exports = {
  /* BAD_REQUEST_CODE, */
  UNAUTHORIZED_CODE,
  FORBIDDEN_CODE,
  CONFLICT_CODE,
  checkRes,
};
