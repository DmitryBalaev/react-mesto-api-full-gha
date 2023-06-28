const router = require('express').Router();
const userRouter = require('./userRouter');
const cardRouter = require('./cardRouter');
const authMiddleware = require('../middlewares/auth');
const { validateLogin, validateRegistration } = require('../utils/validationDataConfig');
const { login, createUser } = require('../controllers/users');
const { NotFound } = require('../utils/responsesErrors/NotFound');

router.use('/users', authMiddleware, userRouter);
router.use('/cards', authMiddleware, cardRouter);

router.use('/signin', validateLogin, login);
router.use('/signup', validateRegistration, createUser);

router.use('*', authMiddleware, (req, res, next) => {
  next(new NotFound('Указан не существующий путь.'));
});

module.exports = router;
