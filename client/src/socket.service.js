import { addConversation, messageReceived } from "actions/chatActions";
import io from "socket.io-client";
import store from "store";
let socket = null

export const initiateSocket = (user) => {
  if(!socket && user._id){
    socket = io.connect("http://127.0.0.1:5000");

    socket.on('message', message => {
    
      if(message.chatters.includes(user._id)){

        console.log('I am included')

        const { text, user, createdOn, chatId} = message
        const newMsg = {
          text,
          user,
          createdOn,
          chatId
        }
        
        console.log(message.chatObj)

        store.dispatch(messageReceived(newMsg))

        if(message.chatObj)store.dispatch(addConversation(message.chatObj))
      }
    })
  }
}

export const subscribeToChat = (chatId, callback) => {

  if(!socket)return true;

  socket.on('message', message => {
    console.log('socket event broadcast from server')
    if(message.chatId === chatId){
      console.log('socket event received')
      return callback(null, message)
    }
  })

}

export const sendMessage = (newMessage) => {
  if(socket) socket.emit('chatMessage', newMessage)
}


export const disconnectSocket = () => {

  if(!socket)return true;
  socket.disconnect()
}
    


    // console.log(user._id)
    // if(message.chatters[1]===user._id){console.log('msg4u')}
    // setMessages([...messages, message])



// import React from 'react'
// export const socket = io.connect("http://127.0.0.1:5000");
// export const SocketContext = React.createContext();
