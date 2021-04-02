import React, { useContext, useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { SocketContext } from 'socket.service';

import styles from './Chat.module.scss';
import ConversationDiv from './conversationDiv';
import MessageDiv from './MessageDiv';

const Chat = () => {

  const user = useSelector(state => state.auth?.user)
  const inputRef = useRef()

  const socket = useContext(SocketContext)

  const [ messages, setMessages ] = useState([])
  const [ conversations, setConversations ] = useState([])
  const [ selectedConvo, setSelectedConvo ] = useState(conversations.length&&conversations[0])

  const switchCovo = (_id) => setSelectedConvo(conversations.find(i => i.user._id === _id))

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMessage = {
      user:{
        avatar:user.avatar,
        _id:user._id,
      },
      chatters:[user._id, selectedConvo.user._id],
      chatId:selectedConvo.chatId,
      createdOn: new Date(),
      text:inputRef.current.value
    }
    socket.emit('chatMessage', newMessage)
    inputRef.current.value = ''
  }

  useEffect(() => {
  
    const newChatStorage = JSON.parse(localStorage.getItem('newChat'))
    if(newChatStorage){
      setConversations([...conversations, newChatStorage])
      setSelectedConvo(newChatStorage)
    }
    return () => {
      localStorage.removeItem('newChat')
    }
  }, [])

  const renderMessage = (userId, chatId) => {
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
              renderMessage(user._id, message.chatId) && 
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