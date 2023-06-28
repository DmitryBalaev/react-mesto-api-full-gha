const userRouter = require('express').Router();

const {
  getAllUsers,
  getUser,
  getCurrentUser,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');
const { validateUserId, validateUserUpdate, validateUserUpdateAvatar } = require('../utils/validationDataConfig');

userRouter.get('/', getAllUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:userId', validateUserId, getUser);
userRouter.patch('/me', validateUserUpdate, updateUserInfo);
userRouter.patch('/me/avatar', validateUserUpdateAvatar, updateUserAvatar);

module.exports = userRouter;
