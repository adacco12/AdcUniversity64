const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let userSchema = new Schema({
  _id: {
    type: String
  },
  Counter: {
    type: Number
  },
  Id: {
    type: Number
  },
  Red_br: {
    type: Number
  },
  UserId: {
    type: String
  },
  FirstName: {
    type: String
  },
  Password: {
    type: String
  },
  PocDate: {
    type: String
  },
  Ozn: {
    type: Number
  }
}, {
  collection: 'Users'
});


module.exports = mongoose.model('Users', userSchema);
