const INTERNAL_SERVER_ERROR_CODE = 500;
const BAD_REQUEST_CODE = 400;
const NOT_FOUND_CODE = 404;

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = 400;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

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