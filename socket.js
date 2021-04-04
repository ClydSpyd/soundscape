const Conversation = require("./models/Conversation");
const Message = require("./models/Message");

const users = [];

//user connects
function userConnect(id, user){
  const newUser = { 
    socketId:id, 
    userId:user._id,
    username:user.name 
  }
  users.push(newUser)
  return newUser
}


//user dicsonnects
function userDisconnect(id) {
  const index = users.findIndex(user => user.id === id)
  if(index!==-1){
    return users.splice(index, 1)[0]
  }
}


const useSocket = async (io) => {
  
  io.on('connection', socket => {
    
    socket.on('userConnect', user => {
      userConnect(socket.id, user)
      console.log(users)
    })


    socket.on('chatMessage', async message => {
      io.emit('message', message)
      const newMsg = new Message(message)
      await newMsg.save()
    })


  //run when a client disconnects
  socket.on('disconnect', () => {

    console.log('socket ' + socket.id + ' disconnected')
    const index = users.findIndex(user => user.id === id)
    if(index!==-1){
      return users.splice(index, 1)[0]
    }
  })
  })

}

module.exports = useSocket