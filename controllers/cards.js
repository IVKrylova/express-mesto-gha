const Card = require('../models/card');
const {
  INTERNAL_SERVER_ERROR_CODE,
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  InternalServerError,
  BadRequestError,
  NotFoundError
} = require('../utils/utils');

// получаем все карточки
module.exports.getCards = (req, res) => {
  Card.find({})
    .then(card => res.send({ data: card }))
    .catch(err => {
      if (err.name === 'InternalServerError') {
        return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Внутренняя ошибка сервера: ${err.message}` });
      }
      console.log(`Произошла неизвестная ошибка ${err.name}: ${err.message}`);
    });
};

// создаем новую карточку
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then(card => res.send({ data: card }))
    .catch(err => {
      if (err.name === 'InternalServerError') {
        return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Внутренняя ошибка сервера: ${err.message}` });
      }
      if (err.name === 'BadRequestError') {
        return res.status(BAD_REQUEST_CODE).send({ message: 'Переданы некорректные данные при создании карточки' });
      }
      console.log(`Произошла неизвестная ошибка ${err.name}: ${err.message}`);
    });
};

// удаляем карточку по id
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then(card => res.send({ data: card }))
    .catch(err => {
      if (err.name === 'InternalServerError') {
        return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Внутренняя ошибка сервера: ${err.message}` });
      }
      if (err.name === 'NotFoundError') {
        return res.status(NOT_FOUND_CODE).send({ message: 'Карточка с указанным _id не найдена' });
      }
      console.log(`Произошла неизвестная ошибка ${err.name}: ${err.message}`);
    });
};

// ставим лайк карточке
module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  ).then(card => res.send({ data: card }))
    .catch(err => {
      if (err.name === 'InternalServerError') {
        return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Внутренняя ошибка сервера: ${err.message}` });
      }
      if (err.name === 'BadRequestError') {
        return res.status(BAD_REQUEST_CODE).send({ message: 'Переданы некорректные данные для постановки лайка' });
      }
      if (err.name === 'NotFoundError') {
        return res.status(NOT_FOUND_CODE).send({ message: 'Передан несуществующий _id карточки' });
      }
      console.log(`Произошла неизвестная ошибка ${err.name}: ${err.message}`);
    });
}

// удаляем лайк карточки
module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  ).then(card => res.send({ data: card }))
    .catch(err => {
      if (err.name === 'InternalServerError') {
        return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Внутренняя ошибка сервера: ${err.message}` });
      }
      if (err.name === 'BadRequestError') {
        return res.status(BAD_REQUEST_CODE).send({ message: 'Переданы некорректные данные для снятия лайка' });
      }
      if (err.name === 'NotFoundError') {
        return res.status(NOT_FOUND_CODE).send({ message: 'Передан несуществующий _id карточки' });
      }
      console.log(`Произошла неизвестная ошибка ${err.name}: ${err.message}`);
    });
}