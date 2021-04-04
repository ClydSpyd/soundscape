import { addConversation, messageReceived } from "actions/chatActions";
import io from "socket.io-client";
import store from "store";
let socket = null

export const initiateSocket = (user) => {
  if(!socket && user._id){
    socket = io.connect("http://127.0.0.1:5000");

    socket.emit('userConnect', user)

    socket.on('message', message => {
    
      if(message.chatters.includes(user._id)){

        console.log('I am included')
        const { text, createdOn, chatId} = message
        const newMsg = {
          text,
          user:message.user,
          createdOn,
          chatId
        }

        store.dispatch(messageReceived(newMsg))

        if(message.isNew?.user._id===user._id){ //is it a new conversation?
          const newConv = {
            chatId:message.chatId,
            user:message.user //assign user as me
          }

          // console.log('NEW CONVO')
          // socket.emit('createNewConversation', newConv)
         
          store.dispatch(addConversation(newConv))
        }
      }
    })
  }
}

// export const subscribeToChat = (chatId, callback) => {

//   if(!socket)return true;

//   socket.on('message', message => {
//     console.log('socket event broadcast from server')
//     if(message.chatId === chatId){
//       console.log('socket event received')
//       return callback(null, message)
//     }
//   })

// }

export const sendMessage = (newMessage) => {
  if(socket) socket.emit('chatMessage', newMessage)
}

// export const saveNewConvo = (newConvo) => {
//   socket.emit('createNewConversation', newConvo)
// }


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
