const { NODE_ENV, JWT_SECRET } = process.env;
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { checkRes } = require('../utils/utils');

// получаем всех пользователей
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};

// получаем пользователя по id
module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((data) => checkRes(data))
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};

// создаем нового пользователя
// eslint-disable-next-line consistent-return
module.exports.createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  if (!validator.isEmail(email)) {
    return res.status(401).send({ message: 'Неправильные почта или пароль' });
  }

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};

// обновляем профиль
module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((data) => checkRes(data))
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};

// обновляем аватар
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((data) => checkRes(data))
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};

// вход в приложение
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
        .end();
    })
    .catch((err) => next(err));
};

// получаем текущего пользователя
module.exports.getCurrentUser = (req, res, next) => {
  const { _id } = req.user._id;

  User.findById(_id)
    .then((data) => checkRes(data))
    .then((user) => res.send({ data: user }))
    .catch((err) => next(err));
};
