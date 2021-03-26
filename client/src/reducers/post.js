const initialState = {
  loading:false,
  posts:[],
  post:{},
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

    case 'POST_RETREIVED':
      return{
        ...state,
        loading: false,
        post: payload
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
    
    case 'POST_LIKED': 
      return{
        ...state,
        post:payload
      }
    
    case 'COMMENT_POSTED':  
      return{
        ...state,
        post:{
          ...state.post,
          comments:payload.comments
        }
      }
    
    case 'POST_ERROR_REFRESH':
      console.log('REFRESH')
      return {
        ...state,
        error:initialState.error
      }

    default:
      return state
  }
}