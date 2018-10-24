const mongoose = require('mongoose');
const validator = require('validator');
const beautifyUnique = require('mongoose-beautiful-unique-validation');

const guestSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    dietry_note: {
      type: String,
    },
    attendance_status: {
      type: String,
      required: true,
      enum: ['INVITED', 'ACCEPTED', 'DECLINED'],
      default: 'INVITED',
    },
    email: {
      type: String,
      unique: 'Two guests cannot share the same email - ({VALUE})',
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Invalid Email Address'],
    },
    cell: {
      type: String,
    },
  },
  { timestamps: true }
);

guestSchema.plugin(beautifyUnique);

module.exports = mongoose.model('guest', guestSchema);
