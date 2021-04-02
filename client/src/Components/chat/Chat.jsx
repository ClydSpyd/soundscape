import { addConversation, messageReceived } from 'actions/chatActions';
import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { sendMessage } from 'socket.service';
import store from 'store';

import styles from './Chat.module.scss';
import ConversationDiv from './conversationDiv';
import MessageDiv from './MessageDiv';

const Chat = () => {

  const newChatStorage = JSON.parse(localStorage.getItem('newChat')) //if user is instatiating new conversation
  const chatTarget = localStorage.getItem('chatter')//if user is opening existing chat

  const user = useSelector(state => state.auth?.user)
  const stateConversations = useSelector(state => state.chatData.conversations)
  const messages = useSelector(state => state.chatData.messages)
  
  const [ conversations, setConversations ] = useState(stateConversations)
  const [ selectedConvo, setSelectedConvo ] = useState(conversations.length&&conversations[0])
  
  const inputRef = useRef()


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

    inputRef.current.value = ''

    sendMessage(newMessage)
    
    if(newChatStorage){
      store.dispatch(addConversation(newChatStorage))
      localStorage.removeItem('newChat')
    }
  }

  useEffect(() => {

    if(stateConversations.length>conversations.length){
      setConversations(stateConversations)
      setSelectedConvo(stateConversations[stateConversations.length-1])
    }

    if(newChatStorage){
      setConversations([...conversations, newChatStorage])
      setSelectedConvo(newChatStorage)
    }

    if(chatTarget){
      setSelectedConvo(conversations.find(i => i.user._id === chatTarget))
      // @todo select correct convo when chatter key is present in LS
    }
    return () => {
      localStorage.removeItem('newChat')
      localStorage.removeItem('chatter')
    }

  }, [stateConversations])


  return (
    <div className={`${styles.chatContainer}`}>

      <div className={styles.conversations}>

        {
          conversations.map((item, idx) => 
            item?.user&&
              <ConversationDiv 
                conversations={conversations}
                selectedId={selectedConvo.user._id}
                setSelectedConvo={setSelectedConvo}
                item={item} />
          )
        }

      </div>
      <div className={styles.chatWindow}>
        <div className={styles.messages}>
          {
            messages.map((message, idx)=>
              selectedConvo?.chatId === message.chatId && 
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