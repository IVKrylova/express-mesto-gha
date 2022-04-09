const Card = require('../models/card');

// получаем все карточки
module.exports.getCards = (req, res) => {
  Card.find({})
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

// создаем новую карточку
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

// удаляем карточку по id
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
};

// ставим лайк карточке
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  ).then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
}

// удаляем лайк карточки
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  ).then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: `Произошла ошибка: ${err.message}` }));
}