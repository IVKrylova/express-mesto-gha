const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const { PORT = 3000 } = process.env;
const { INTERNAL_SERVER_ERROR_CODE, BAD_REQUEST_CODE, NOT_FOUND_CODE } = require('./utils/utils');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// авторизация пользователя
app.use((req, res, next) => {
  req.user = {
    _id: '6251a49680b1ddcf6859a5e2',
  };

  next();
});

app.use(usersRoutes);
app.use(cardsRoutes);

// Обработка неправильного пути
app.use((req, res) => {
  res.status(NOT_FOUND_CODE).send({ message: 'Страница не найдена' });
});

// обработка ошибок
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(BAD_REQUEST_CODE).send({ message: 'Переданы некорректные данные' });
  }
  if (err.name === 'CastError') {
    return res.status(BAD_REQUEST_CODE).send({ message: 'Переданы некорректные данные' });
  }
  if (err.statusCode === NOT_FOUND_CODE) {
    return res.status(NOT_FOUND_CODE).send({ message: err.message });
  }
  next();
  return res.status(INTERNAL_SERVER_ERROR_CODE).send({ message: `Внутренняя ошибка сервера: ${err.message}` });
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listening on port ${PORT}`);
  });
}

main();
