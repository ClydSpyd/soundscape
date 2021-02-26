const intitialState = {
  me:null,
  profile: null,
  profiles: [],
  loading: true,
  saving:false,
  error: null
}

export default function(state=intitialState, action){

  const { type, payload } = action;

  switch(type){

    case 'CLEAR_PROFILE':
     return intitialState
     
    case 'PROFILE_LOADING':
     return{  
        ...state,
        loading:true
     }
    case 'MY_PROFILE_RETRIEVED':
      return{
        ...state,
        me: payload,
        loading: false
      }
    case 'PROFILE_RETRIEVED':
      return{
        ...state,
        profile: payload,
        loading: false
      }
    case 'SAVE_PROFILE':
    // @@TODO split into 2 actions - request and success. --loading
      return{
        ...state,
        saving:true
      }
    case 'PROFILE_SAVED':
    // @@TODO split into 2 actions - request and success. --loading
      return{
        ...state,
        me:payload,
        loading:false,
        saving:false,
        // error?
      }
    case 'PROFILE_ERROR':
      console.log('profile error')
      return{
        ...state,
        profile:null,
        loading:false,
        error: payload.data.msg
      }

    default:
      return state
  }
}