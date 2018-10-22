const mongoose = require("mongoose");
require("dotenv").config({ path: "variables.env" });

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
const db = mongoose.connect(process.env.DATABASE);

mongoose.connection.on("error", err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

// type User {
//   id: ID! @unique
//   name: String!
//   email: String! @unique
//   password: String!
//   resetToken: String
//   resetTokenExpiry: Float

// }

// type Guest {
//   id: ID! @unique
//   firstname: String!
//   lastname: String!
//   dietry_note: String
//   status: AttendanceStatus! @default(value: "INVITED")
//   email: String
//   cell: String
// }

// type Rsvp {
//   id: ID! @unique
//   guests: [Guest!]!
// }

// enum AttendanceStatus {
//   INVITED,
//   ACCEPTED,
//   DECLINED
// }

module.exports = db;
