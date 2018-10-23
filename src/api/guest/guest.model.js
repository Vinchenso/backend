const mongoose = require('mongoose');
const guestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {timestamps: true},
);

module.exports = mongoose.model('guest', guestSchema);
