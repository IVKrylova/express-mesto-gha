const User = require('../models/user');
const { checkRes, checkReqForUpdateProfile, checkReqForUpdateAvatar } = require('../utils/utils');

// получаем всех пользователей
module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(err => next(err));
};

// получаем пользователя по id
module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then(res => checkRes(res))
    .then(user => res.send({ data: user }))
    .catch(err => next(err));
};

// создаем нового пользователя
module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => next(err));
};

// обновляем профиль
module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  checkReqForUpdateProfile(req);

  User.findByIdAndUpdate(req.user._id, { name: name, about: about }, { new: true })
    .then(res => checkRes(res))
    .then(user => res.send({ data: user }))
    .catch(err => next(err));
}

// обновляем аватар
module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  checkReqForUpdateAvatar(req);

  User.findByIdAndUpdate(req.user._id, { avatar: avatar }, { new: true })
    .then(res => checkRes(res))
    .then(user => res.send({ data: user }))
    .catch(err => next(err));
}