export const addConversation = ( object ) => async dispatch => {

  console.log( object )

  dispatch({ type: 'ADD_CONVERSATION', payload:object })
  
}

export const messageReceived = ( message ) => async dispatch => {

  console.log( message )

  dispatch({ type: 'MESSAGE_RECEIVED', payload:message })
  
}