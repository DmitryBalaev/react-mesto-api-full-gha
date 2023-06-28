const mongoose = require('mongoose');

const Card = require('../models/card');

const { ValidationError } = mongoose.Error;
const {
  STATUS_OK_CREATED,
  STATUS_OK,
} = require('../utils/constants');
const { BadRequest } = require('../utils/responsesErrors/BadRequest');
const { Forbidden } = require('../utils/responsesErrors/Forbidden');
const { NotFound } = require('../utils/responsesErrors/NotFound');

const getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(STATUS_OK).send({ data: cards }))
    .catch((err) => next(err));
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(STATUS_OK_CREATED).send({ data: card }))
    .catch((err) => {
      if (err instanceof ValidationError) {
        next(new BadRequest(err.message));
      } else next(err);
    });
};

const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new NotFound(`Передан не существующий ${req.params.cardId} карточки`))
    .then(async (deletedCard) => {
      if (!deletedCard.owner.equals(req.user._id)) {
        return next(new Forbidden('Карточка принадлежит другому пользователю'));
      }
      await Card.deleteOne(deletedCard);
      return res.send(deletedCard);
    })
    .catch((err) => next(err));
};

const setLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new NotFound(`Передан не существующий ${req.params.cardId} карточки`))
    .then((card) => res.send({ data: card }))
    .catch((err) => next(err));
};

const removeLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new NotFound(`Передан не существующий ${req.params.cardId} карточки`))
    .then((card) => res.send({ data: card }))
    .catch((err) => next(err));
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  setLikeCard,
  removeLikeCard,
};
