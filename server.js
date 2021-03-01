const express = require("express")
const connectDB = require("./config/db")
const multer = require('multer');
const storage = multer.memoryStorage();
const fileUpload = multer({storage});

const app = express()

//connect db
connectDB()

// Init middleware
app.use(express.json({ extended: false })) //body parser
app.use('/*', fileUpload.single('avatar'));

// define routes
app.use('/api/users', require('./routes/user'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/profile', require('./routes/profile'))

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))