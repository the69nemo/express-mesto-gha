const User = require('../models/user');
const updateParams = {
  new: true,
  runValidators: true,
  upsert: true
};

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch((err) => console.log(err))
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
  .then((user) => {
    return (!user)
    ? res.status(404).send({message: 'Пользователь не найден'})
    : res.send({ data: user })
  })

    .catch((err) => {
      return (err.name === 'ValidationError')
      ? res.status(400).send({message: 'Переданны некорректные данные для поиска'})
      : res.status(500).send({message: 'Ошибка сервера'})
    })
};

module.exports.createNewUser = (req, res) => {
  const {name, about, avatar} = req.body;

  (!name || !about || !avatar)
  ? res.status(400).send({message: 'Данные не заполненны'})
  : User.create({ name, about, avatar })
    .then((user) => res.send({data: user}))
    .catch((err) => {
      return (err.name === 'ValidationError')
      ? res.status(400).send({message: 'Переданны некорректные данные для создания профиля'})
      : res.status(500).send({message: 'Ошибка сервера'})
    })
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  (!name || !about)
  ? res.status(400).send({message: 'Данные не заполненны'})
  : User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    updateParams)
    .then((user) => {
      return (!user)
      ? res.status(404).send({message: 'Пользователь не найден'})
      :res.send({ data: user })
    })
    .catch((err) => {
      return (err.name === 'ValidationError')
      ? res.status(400).send({message: 'Переданны некорректные данные для редактирования профиля'})
      : res.status(500).send({message: 'Ошибка сервера'})
    })
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  (!avatar)
  ? res.status(400).send({message: 'Данные не заполненны'})
  : User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    updateParams)
    .then((user) => {
      return (!user)
      ? res.status(404).send({message: 'Пользователь не найден'})
      : res.send({ data: user })
    })
    .catch((err) => {
      return (err.name === 'ValidationError')
      ? res.status(400).send({message: 'Переданны некорректные данные для смены аватара'})
      : res.status(500).send({message: 'Ошибка сервера'})
    })
};