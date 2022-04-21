const BAD_REQUEST_CODE = 400;
const UNAUTHORIZED_CODE = 401;
const FORBIDDEN_CODE = 403;
const NOT_FOUND_CODE = 404;
const CONFLICT_CODE = 409;
const INTERNAL_SERVER_ERROR_CODE = 500;
const { NotFoundError } = require('./NotFoundError');
const { UnauthorizedError } = require('./UnauthorizedError');
const { ForbiddenError } = require('./ForbiddenError');

// проверка на поиск по некорректным данным
const checkRes = (res) => {
  if (res === null) {
    throw new NotFoundError('Объект с указанным _id не найден');
  }
  return res;
};

// проверка на неправильный email/password
const checkAuth = (res) => {
  if (!res) {
    throw new UnauthorizedError('Передан неверный логин или пароль');
  }
};

// проверка прав доступа
const checkOwnerCard = (req, data) => {
  if (req.user._id !== data.owner.toString()) {
    throw new ForbiddenError('Попытка удалить чужую карточку');
  }
};

module.exports = {
  BAD_REQUEST_CODE,
  UNAUTHORIZED_CODE,
  FORBIDDEN_CODE,
  NOT_FOUND_CODE,
  CONFLICT_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  checkRes,
  checkAuth,
  checkOwnerCard,
};
