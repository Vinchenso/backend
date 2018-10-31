const mongoose = require('mongoose');
const validator = require('validator');

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
    notes: {
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
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, 'Invalid Email Address'],
    },
    cell: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

guestSchema.virtual('fullname').get(function() {
  return `${this.firstname} ${this.lastname}`;
});

guestSchema.virtual('fullname').set(function(name) {
  const split = name.split(' ');
  this.firstname = split[0];
  this.lastname = split.slice(1);
});

module.exports = mongoose.model('guest', guestSchema);
