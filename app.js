const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, errors, Joi } = require('celebrate');
const { login, createNewUser } = require('./controllers/user');
const auth = require('./middlewares/auth');
const handleError = require('./middlewares/handleError');
const NotFoundErr = require('./errors/NotFoundErr');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', () => {
  // eslint-disable-next-line no-console
  console.log('**********Подключено к Базе**********');
});

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createNewUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.use(auth);

app.use('/users', require('./routes/user'));

app.use('/cards', require('./routes/card'));

app.use((req, res, next) => {
  next(new NotFoundErr('Запрашиемый ресур не найден'));
});

app.use(errors());

app.use(({ req, res, next }) => handleError({ req, res, next }));

app.listen(PORT);
