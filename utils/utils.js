const INTERNAL_SERVER_ERROR_CODE = 500;
const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;
const { NotFoundError } = require('./NotFoundError');

const checkRes = res => {
  if (res === null) {
    throw new NotFoundError('Объект с указанным _id не найден');
  }
  return res
}

module.exports = {
  INTERNAL_SERVER_ERROR_CODE,
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  checkRes
}