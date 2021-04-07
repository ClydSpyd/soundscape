const express = require("express")
const http = require('http')
const path = require('path')

const connectDB = require("./config/db")

const multer = require('multer');
const storage = multer.memoryStorage();
const fileUpload = multer({storage});

const app = express()
const server = http.createServer(app)

const socketio = require('socket.io')
const useSocket = require('./socket')
const io = socketio(server)


const dev = app.get('env') !== 'production'

// allow cross-origin requests
const cors = require('cors');
app.use(cors());
app.options('*', cors());

//connect db
connectDB()

//initiat web socket
useSocket(io)

// Init middleware
app.use(express.json({ extended: false })) //body parser
app.use('/*', fileUpload.single('image'));

// define routes
app.use('/api/users', require('./routes/user'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/profile', require('./routes/profile'))
app.use('/api/posts', require('./routes/posts'))

if(!dev){

  app.use(express.static(path.resolve(__dirname, 'client', 'build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resplve(__dirname, 'client', 'build', 'index.html'))
  })

}


const PORT = process.env.PORT || 5000

server.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))

