const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required:true
  },
  password:{
    type: String,
    required:true
  },
  avatar:{
    type: String,
    default:'https://soundscapeuseravatars.s3-eu-west-1.amazonaws.com/default_profile_pic.png'
  },
  date:{
    type: Date,
    default: Date.now
  }
})

module.exports = User = mongoose.model('user', UserSchema)