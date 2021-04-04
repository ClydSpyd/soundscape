const mongoose = require("mongoose")

const ConversationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  chatId:{
    type: String,
    required: true
  }
})


module.exports = Conversation = mongoose.model('conversation', ConversationSchema)