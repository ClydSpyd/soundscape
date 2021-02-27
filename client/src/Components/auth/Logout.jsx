import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { logout } from '../../actions/authActions';
import store from '../../store';

const Logout = () => {

  const history = useHistory()
  useEffect(()=>{
    store.dispatch( logout(history) )
  },[])

  return (
    
    <h6>logout</h6>
  )

}

export default Logout;