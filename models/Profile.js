const mongoose = require("mongoose")

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  location:{
    type: String
  },
  bio: {
    type: String
  },
  genres:{
    type: [String]
  },
  status:{
    type: String,
    default: 'Music Lover'
  },
  projects:{
    type:[ mongoose.Schema.Types.ObjectId ],
    ref: 'discovery'
  },
  essentialListening:[
    {
      title:{
        type: String
      },
      artist:{
        type: String
      },
      itemUrl:{
        type: String
      }
    }
  ],
  spotify:{
    type: String
  },
  soundcloud:{
    type: String
  },
  youtube:{
    type: String
  },
  facebook:{
    type: String
  },
  instagram:{
    type: String
  },
  twitter:{
    type: String
  }
  
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)