const express = require("express")
const http = require('http')
const connectDB = require("./config/db")
const multer = require('multer');
const storage = multer.memoryStorage();
const fileUpload = multer({storage});
// const socketio = require('socket.io')
const useSocket = require('./socket')
const path = require('path')

const app = express()
const server = http.createServer(app)

// const options={
//   cors:true,
//   origins:["http://127.0.0.1:5001"],
//  }

// const io = socketio(server, options)



// allow cross-origin requests
const cors = require('cors');
app.use(cors());
app.options('*', cors());


//connect db
connectDB()

//initiat web socket
// useSocket(io)

// Init middleware
app.use(express.json({ extended: false })) //body parser
app.use('/*', fileUpload.single('image'));

// define routes
app.use('/api/users', require('./routes/user'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/profile', require('./routes/profile'))
app.use('/api/posts', require('./routes/posts'))
app.use('/api/chat', require('./routes/chat'))

// serve static assets in production
if(process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
