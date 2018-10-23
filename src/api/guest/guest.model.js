const mongoose = require('mongoose');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');

const guestSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    dietry_note: {
      type: String
    },
    attendance_status: {
      type: String,
      required: true,
      enum: ['INVITED', 'ACCEPTED', 'DECLINED'],
      default: 'INVITED'
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Invalid Email Address']
    },
    cell: {
      type: String
    }
  },
  { timestamps: true }
);

guestSchema.plugin(mongodbErrorHandler);
module.exports = mongoose.model('guest', guestSchema);
