const mongoose = require('mongoose');
const validatorUrl = require('validator/lib/isURL');
const validatorEmail = require('validator/lib/isEmail');
const bcrypt = require('bcryptjs');
const { Unauthorized } = require('../utils/responsesErrors/Unauthorized');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: 'Жак-Ив Кусто',
      minlength: 2,
      maxlength: 30,
    },
    about: {
      type: String,
      default: 'Исследователь',
      minlength: 2,
      maxlength: 30,
    },
    avatar: {
      type: String,
      default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: validatorUrl,
    },
    email: {
      type: String,
      validate: validatorEmail,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
);

// eslint-disable-next-line func-names, consistent-return
userSchema.statics.findUserByCredentials = async function (email, password, next) {
  try {
    const user = await this.findOne({ email }).select('+password');

    if (!user) {
      return Promise.reject(new Unauthorized('Неправильные почта или пароль'));
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return Promise.reject(new Unauthorized('Неправильные почта или пароль'));
    }

    return user;
  } catch (err) {
    next(err);
  }
};

module.exports = mongoose.model('user', userSchema);
