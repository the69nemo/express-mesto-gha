const User = require('../models/user');

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
}
