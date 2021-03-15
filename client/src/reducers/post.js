const initialState = {
  loading:false,
  posts:[],
  error:null
}

export default function(state=initialState, action){

  const { type, payload } = action;

  switch(type){

    case 'POST_QUERY':
      return{
        ...state,
        loading:true
      }

    case 'POST_SUCCESS':
      return{
        ...state,
        loading:false,
      }

    case 'POSTS_RETREIVED':
      return{
        ...state,
        loading:false,
        posts:payload
      }

    case 'POST_ERROR':
      return{
        ...state,
        loading:false,
        error:payload
      }

    default:
      return state
  }
}