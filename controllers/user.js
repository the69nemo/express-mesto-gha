const User = require('../models/user');
const updateParams = {
  new: true,
  runValidators: true,
  upsert: true
};

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((user) => res.send({data: user}))
    .catch((err) => console.log(err))
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch((err) => console.log(err))
};

module.exports.createNewUser = (req, res) => {
  const {name, about, avatar} = req.body;

  User.create({name, about, avatar})
    .then((user) => res.send({data: user}))
    .catch((err) => console.log(err))
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    updateParams)
    .then((user) => res.send({data: user}))
    .catch((err) => console.log(err))
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    updateParams)
    .then((user) => res.send({data: user}))
    .catch((err) => console.log(err))
};