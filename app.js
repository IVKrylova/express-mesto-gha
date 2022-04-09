const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRoutes = require('./routes/users');
const cardsRoutes = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// авторизация пользователя
app.use((req, res, next) => {
  req.user = {
    _id: '6251a49680b1ddcf6859a5e2'
  };

  next();
});

app.use(usersRoutes);
app.use(cardsRoutes);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
  });
}

main();
