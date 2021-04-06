import axios from 'axios'
import setAuthToken from '../helpers/setAuthToken';

export const getChatData = (_id) => async dispatch => {

  const token = localStorage.getItem('t')
  if(token)(setAuthToken(token))

  console.log('GET CHAT DATA')
  const {data} = await axios.get (`api/chat`)
  const dupeArray = [...data]
  console.log(data)

  let conversations = [...new Map(dupeArray.map(item => [item['chatId'], item])).values()]

  conversations.forEach(convo => {
    const displayUser=convo.chatters.find(i=>i._id!==_id)
    convo.displayUser=displayUser
  })

  console.log(data)
  console.log(conversations)




  dispatch({ 
    type: 'ADD_CHAT_DATA', 
    payload:{
      messages: data,
      conversations: conversations
    } 
  })
}


export const addConversation = ( object ) => async dispatch => {

  console.log( object )

  dispatch({ type: 'ADD_CONVERSATION', payload:object })
  
}

export const messageReceived = ( message ) => async dispatch => {

  console.log( message )

  dispatch({ type: 'MESSAGE_RECEIVED', payload:message })
  
}