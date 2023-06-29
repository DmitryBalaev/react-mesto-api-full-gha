const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { ValidationError } = mongoose.Error;
const User = require('../models/user');
const { SECRET } = require('../utils/config');
const { NotFound } = require('../utils/responsesErrors/NotFound');
const { BadRequest } = require('../utils/responsesErrors/BadRequest');
const Duplicate = require('../utils/responsesErrors/Duplicate');

const {
  STATUS_OK_CREATED,
  STATUS_OK,
} = require('../utils/constants');

const getAllUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new NotFound(`Пользователь с таким ${req.params.userId} не найден.`))
    .then((user) => res.status(STATUS_OK).send({ data: user }))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new NotFound(`Пользователь с таким ${req.user._id} не найден.`))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  return bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then(() => res.status(STATUS_OK_CREATED).send({
      name, about, avatar, email,
    }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest(err.message));
      } else if (err.code === 11000) {
        next(new Duplicate('Пользователь с таким email уже зарегистрирован.'));
      } else {
        next(err);
      }
    });
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(new NotFound(`Пользователь с таким ${req.user._id} не найден.`))
    .then((updateUserData) => res.send({ data: updateUserData }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest(err.message));
      } else next(err);
    });
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(new NotFound('карточка или пользователь не найден'))
    .then((updateUserData) => res.send({ data: updateUserData }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest(err.message));
      } else next(err);
    });
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, SECRET, { expiresIn: '7d' });
    res.send({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
  getCurrentUser,
};
