const mongoose = require('mongoose');

// Create a schema for userData
const userDataSchema = new mongoose.Schema({
  Userid:{
    type:String,
    required:true
  },
  Name: {
    type: String,
    required: true
  },
  Age: {
    type: Number,
    required: true
  },
  Address: {
    type: String,
    required: true
  },
  Photo:{
    type: String,
  }
});

const UserData = new mongoose.model('UserData', userDataSchema);

module.exports = UserData;
