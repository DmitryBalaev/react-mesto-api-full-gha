const cardRouter = require('express').Router();

const {
  getAllCards,
  createCard,
  deleteCard,
  setLikeCard,
  removeLikeCard,
} = require('../controllers/cards');
const { validateNewCard, validateCardId } = require('../utils/validationDataConfig');

cardRouter.get('/', getAllCards);
cardRouter.delete('/:cardId', validateCardId, deleteCard);
cardRouter.post('/', validateNewCard, createCard);
cardRouter.put('/:cardId/likes', validateCardId, setLikeCard);
cardRouter.delete('/:cardId/likes', validateCardId, removeLikeCard);

module.exports = cardRouter;
