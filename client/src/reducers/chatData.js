const initialState = {
  conversations:[],
  messages:[],
  unread:0,
  loading:false,
  error:null
}

export default function(state=initialState, action){

  const { type, payload } = action;

  switch(type){

    case 'ADD_CHAT_DATA':
      console.log(payload)
      return{
        ...state,
        messages: payload.messages,
        conversations: payload.conversations
      }

    case 'ADD_CONVERSATION':
      return{
        ...state,
        conversations:[
          ...state.conversations,
          payload
        ]
      }

    case 'MESSAGE_RECEIVED':
      return{
        ...state,
        messages:[
          ...state.messages,
          payload
        ]
      }

    default:
      return state
  }

}