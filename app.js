require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const {
  login,
  createUser,
} = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const {
  BAD_REQUEST_CODE,
  NOT_FOUND_CODE,
  INTERNAL_SERVER_ERROR_CODE,
  CONFLICT_CODE,
  UNAUTHORIZED_CODE,
} = require('./utils/utils');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// роут для регистрации пользователя
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
// роут для авторизации пользователя
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().uri(),
  }),
}), createUser);

// авторизация
app.use(auth);

app.use(usersRoutes);
app.use(cardsRoutes);

// обработчик ошибок celebrate
app.use(errors());

// oбработка неправильного пути
app.use((req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: 'Страница не найдена' });
});

// обработка ошибок
// eslint-disable-next-line consistent-return
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    return res.status(BAD_REQUEST_CODE).send({ message: 'Переданы некорректные данные' });
  }
  if (err.statusCode === NOT_FOUND_CODE) {
    return res.status(NOT_FOUND_CODE).send({ message: err.message });
  }
  if (err.code === 11000) {
    return res.status(CONFLICT_CODE).send({ message: 'При регистрации указан email, который уже существует на сервере' });
  }
  if (err.name === 'UnauthorizedError') {
    return res.status(UNAUTHORIZED_CODE).send({ message: err.message });
  }

  res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: 'Внутренняя ошибка сервера' });
  next();
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listening on port ${PORT}`);
  });
}

main();
