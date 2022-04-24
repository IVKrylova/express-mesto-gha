require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const helmet = require('helmet');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { NOT_FOUND_CODE } = require('./utils/utils');

const { PORT = 3000 } = process.env;

const app = express();

// защита приложения от веб-уязвимостей путем соответствующей настройки заголовков HTTP
app.use(helmet());

app.use(cookieParser());

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
    avatar: Joi.string().uri()
      .regex(/https?:\/\/(www.)?[\w\-.~:/?#[\]@!$&'()*+,;=]{1,256}\.[a-z0-9]{2,6}\b([-\w()@:%.+~#=//?&]*)/),
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
app.use(errorHandler);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listening on port ${PORT}`);
  });
}

main();
