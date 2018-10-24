const mongoose = require('mongoose');

const validator = require('validator');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: 'Two users cannot share the same username ({VALUE})',
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please Supply an email address',
  },
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

userSchema.plugin(beautifyUnique);

module.exports = mongoose.model('user', userSchema);
