const User = require('../models/user');
const {
  INTERNAL_SERVER_ERROR_CODE,
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  InternalServerError,
  BadRequestError,
  NotFoundError
} = require('../utils/utils');

// получаем всех пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(err => {
      if (err.name === 'InternalServerError') {
        return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Внутренняя ошибка сервера: ${err.message}` });
      }
      console.log(`Произошла неизвестная ошибка ${err.name}: ${err.message}`);
    });
};

// получаем пользователя по id
module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      res.send({ data: user })})
    .catch(err => {
      if (err.name === 'InternalServerError') {
        return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Внутренняя ошибка сервера: ${err.message}` });
      }
      if (err.name === 'NotFoundError') {
        return res.status(NOT_FOUND_CODE).send({ message: 'Пользователь по указанному _id не найден' });
      }
      console.log(`Произошла неизвестная ошибка ${err.name}: ${err.message}`);
    });
};

// создаем нового пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => {
      if (err.name === 'InternalServerError') {
        return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Внутренняя ошибка сервера: ${err.message}` });
      }
      if (err.name === 'BadRequestError') {
        return res.status(BAD_REQUEST_CODE).send({ message: 'Переданы некорректные данные при создании пользователя' });
      }
      console.log(`Произошла неизвестная ошибка ${err.name}: ${err.message}`);
    });
};

// обновляем профиль
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const _id = req.user._id;

  User.findOneAndUpdate({ _id: _id }, { name: name, about: about })
    .then(user => res.send({ data: user }))
    .catch(err => {
      if (err.name === 'InternalServerError') {
        return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Внутренняя ошибка сервера: ${err.message}` });
      }
      if (err.name === 'BadRequestError') {
        return res.status(BAD_REQUEST_CODE).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      }
      if (err.name === 'NotFoundError') {
        return res.status(NOT_FOUND_CODE).send({ message: 'Пользователь с указанным _id не найден' });
      }
      console.log(`Произошла неизвестная ошибка ${err.name}: ${err.message}`);
    });
}

// обновляем аватар
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const _id = req.user._id;

  User.findOneAndUpdate({ _id: _id }, { avatar: avatar })
    .then(user => res.send({ data: user }))
    .catch(err => {
      if (err.name === 'InternalServerError') {
        return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Внутренняя ошибка сервера: ${err.message}` });
      }
      if (err.name === 'BadRequestError') {
        return res.status(BAD_REQUEST_CODE).send({ message: 'Переданы некорректные данные при обновлении аватара' });
      }
      if (err.name === 'NotFoundError') {
        return res.status(NOT_FOUND_CODE).send({ message: 'Пользователь с указанным _id не найден' });
      }
      console.log(`Произошла неизвестная ошибка ${err.name}: ${err.message}`);
    });
}