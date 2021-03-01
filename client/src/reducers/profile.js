const intitialState = {
  me:null,
  profile: null,
  profiles: [],
  loading: true,
  saving:false,
  error: null,
  saved:null
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
        loading: false,
        saved:null
      }
    case 'PROFILE_RETRIEVED':
      return{
        ...state,
        profile: payload,
        loading: false,
        saved:null
      }
    case 'SAVE_PROFILE':
    // @@TODO split into 2 actions - request and success. --loading
      return{
        ...state,
        saving:true,
        saved:null
      }
    case 'PROFILE_SAVED':
    // @@TODO split into 2 actions - request and success. --loading
    console.log(payload)
      return{
        ...state,
        me:payload,
        loading:false,
        saving:false,
        saved:true
        // error?
      }
    case 'PROFILE_UNSAVED':
      return{
        ...state,
        saved:false
      }
    case 'PROFILE_ERROR':
      console.log('profile error')
      return{
        ...state,
        profile:null,
        loading:false,
        error: payload.data.msg,
        saved:null
      }

    default:
      return state
  }
}