const User = require('../models/user');

// получаем всех пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

// получаем пользователя по id
module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      res.send({ data: user })})
    .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

// создаем нового пользователя
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

// обновляем профиль
module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const _id = req.user._id;

  User.findOneAndUpdate({ _id: _id }, { name: name, about: about })
  .then(user => res.send({ data: user }))
  .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
}

// обновляем аватар
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  const _id = req.user._id;

  User.findOneAndUpdate({ _id: _id }, { avatar: avatar })
  .then(user => res.send({ data: user }))
  .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
}