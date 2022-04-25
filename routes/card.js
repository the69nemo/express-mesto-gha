const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/card');

router.get('/', getAllCards);
router.post('/', createCard);
router.delete('/:cardId', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().length(24),
  }),
}), deleteCard);
router.put('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().length(24),
  }),
}), likeCard);
router.delete('/:cardId/likes', celebrate({
  body: Joi.object().keys({
    cardId: Joi.string().length(24),
  }),
}), dislikeCard);

module.exports = router;
