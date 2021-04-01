
const useSocket = (io) => {

  
  io.on('connection', socket => {
    console.log('new user')
    console.log(socket.id)


    socket.on('chatMessage', message => {
      console.log(message)
      io.emit('message', message)
    })


  //run when a client disconnects
  socket.on('disconnect', () => {

    console.log('socket ' + socket.id + ' disconnected')
  })
  })

}

module.exports = useSocket