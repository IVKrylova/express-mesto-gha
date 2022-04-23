const Card = require('../models/card');
const { checkRes } = require('../utils/utils');
const { ForbiddenError } = require('../utils/ForbiddenError');

// получаем все карточки
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ data: card }))
    .catch(next);
};

// создаем новую карточку
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

// удаляем карточку по id
module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((data) => checkRes(data))
    .then((card) => {
      if (req.user._id !== card.owner.toString()) {
        throw new ForbiddenError('Попытка удалить чужую карточку');
      }
      return card;
    })
    .then((card) => Card.findByIdAndRemove(card._id.toString())
      .then((data) => res.send({ data })))
    .catch(next);
};

// ставим лайк карточке
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((data) => checkRes(data))
    .then((card) => res.send({ data: card }))
    .catch(next);
};

// удаляем лайк карточки
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((data) => checkRes(data))
    .then((card) => res.send({ data: card }))
    .catch(next);
};
