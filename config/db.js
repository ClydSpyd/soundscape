const mongoose = require("mongoose")
const config = require("config")
const db = config.get('mongoURI')

const connectDB = async() => {

  try {

    mongoose.connect(process.env.MONGODB_URI || db, {
      useNewUrlParser:true, 
      useUnifiedTopology:true, 
      useCreateIndex: true, 
      useFindAndModify: false
    })

   console.log('MongoDB connected')
    
  } catch (err) {

    console.error(err.message)

    process.exit(1) //exit process with failure

  }
}

module.exports = connectDB