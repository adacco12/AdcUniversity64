// Business.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Business
let studentSchema = new Schema({
    IdStud: {
      type: Number
    },
    Code: {
      type: String
    },
    FirstName: {
      type: String
    },
    LastName: {
      type: String
    },
    Email: {
      type: String
    },
    Red_br: {
      type: Number
    },
    Code: {
      type: String
    },
    EnrDate: {
      type: String
    },
    Address: {
      type: String
    },
    Age: {
      type: String
    }
},{
  collection: 'students'
  });


module.exports = mongoose.model('Students', studentSchema);

