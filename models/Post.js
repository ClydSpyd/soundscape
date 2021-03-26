const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String,
  },
  avatar: {
    type: String
  },
  textPlain: {
    type: String,
    required: true
  },
  textHTML: {
    type: String,
    required: true
  },
  title:{
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  createdOn:{
    type: Date,
    default: Date.now
  },
  likes : [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      },
      name: {
        type: String
      }
    }
  ],
  comments : [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String,
      },
      avatar: {
        type: String
      },
      createdOn: {
        type: Date,
        default: Date.now()
      }
    }
  ]
})

module.exports = Post = mongoose.model('post', PostSchema)