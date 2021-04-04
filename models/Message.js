const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  chatId:{
    type: String,
    required: true
  },
  text: {
    type: String,
    require: true
  },
  createdOn: {
    type: Date,
    required: true
  },
  chatters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }]
})


module.exports = Message = mongoose.model('message', messageSchema)