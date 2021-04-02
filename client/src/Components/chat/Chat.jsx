import { addConversation, messageReceived } from 'actions/chatActions';
import React, { useContext, useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { sendMessage, SocketContext } from 'socket.service';
import store from 'store';

import styles from './Chat.module.scss';
import ConversationDiv from './conversationDiv';
import MessageDiv from './MessageDiv';

const Chat = () => {

  const newChatStorage = JSON.parse(localStorage.getItem('newChat')) //if user is instatiating new conversation

  const user = useSelector(state => state.auth?.user)
  const stateConversations = useSelector(state => state.chatData.conversations)
  const messages = useSelector(state => state.chatData.messages)
  
  const [ conversations, setConversations ] = useState(stateConversations)
  const [ selectedConvo, setSelectedConvo ] = useState(conversations.length&&conversations[0])
  
  const inputRef = useRef()

  const switchCovo = (_id) => {
    setSelectedConvo(conversations.find(i => i.user._id === _id))
    console.log(_id)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      createdOn: new Date(),
      text:inputRef.current.value,
      user:user,
      chatId:selectedConvo.chatId,
      chatters:[user._id, selectedConvo.user._id],
      isNew:newChatStorage
    }
    
    sendMessage(newMessage)
    if(newChatStorage){
      store.dispatch(addConversation(newChatStorage))
      localStorage.removeItem('newChat')
    }
    inputRef.current.value = ''
  }

  useEffect(() => {
  
    if(newChatStorage){
      setConversations([...conversations, newChatStorage])
      setSelectedConvo(newChatStorage)
    }
    return () => {
      localStorage.removeItem('newChat')
    }
  }, [])

  const renderMessage = ( chatId ) => {
    return selectedConvo.chatId === chatId
  }


  return (
    <div className={`${styles.chatContainer}`}>

      <div className={styles.conversations}>

        {
          conversations.map((item, idx) => 
            <ConversationDiv 
              switchCovo={switchCovo}
              item={item} /> )
        }

      </div>
      <div className={styles.chatWindow}>
        <div className={styles.messages}>
          {
            messages.map((message, idx)=>
              renderMessage(message.chatId) && 
                <MessageDiv 
                  myId={user._id}
                  key={idx} 
                  message={message} />
            )
          }
        </div>
        <form onSubmit={e=>handleSubmit(e)} className={styles.inputDiv}>
          <input ref={inputRef} autoFocus type="text"/>
          <button type="submit">Send <i class="far fa-paper-plane"/></button>
        </form>
      </div>

    </div>
  )

}

export default Chat;