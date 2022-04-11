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
module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
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
