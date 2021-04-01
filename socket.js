
const useSocket = (io) => {

  
  io.on('connection', socket => {
    console.log('new user')
    console.log(socket.id)


    socket.on('chatMessage', message => {
      console.log(message)
      io.emit('message', message)
    })
  })

}

module.exports = useSocket