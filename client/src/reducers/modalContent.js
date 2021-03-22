const modalContent = (state = {vis:false, component:null}, action) => {

  const { type, payload } = action;

  switch(type){

    case 'SET_MODAL_OVERLAY':
      return payload

    default:
      return state
  }
}

export default modalContent