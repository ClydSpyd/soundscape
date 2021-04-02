import React, { useEffect, useRef, useState } from 'react'
import store from '../../store';
import { loginUser, clearError } from '../../actions/authActions';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { addAnimation } from '../../helpers/addAnimation';
import { disconnectSocket } from 'socket.service';

const Login = () => {

  const [ formData, setFormData ] = useState({email:'', password:''})
  const { email, password } = formData;
  const auth = useSelector(state => state.auth)
  const formRef = useRef()

  const clear = () => {
    store.dispatch(clearError())
  }

  useEffect(()=>{ 
    disconnectSocket()
    if(auth.error){clear()}
    setTimeout(()=>{
      if(formRef.current){formRef.current.classList.remove('zero-opacity')}
    },100)
    return ()=> { clear() }
  },[])

  useEffect(()=>{
    if(auth.error){
      addAnimation(formRef, 'shakeSlow', 500)
    } 
  },[auth])

  const handleChange = (e) => {
    if(auth.error){ store.dispatch(clearError()) }
    setFormData({...formData, [e.target.name]:e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    store.dispatch( loginUser({email, password}) )
  }
  
  return auth.isAuthenticated ? 

      <Redirect to="/dashboard" /> 

  :

    (
      <div className="login">
        <div className="login-inner">
          <form ref={formRef} className="flex-center column zero-opacity" onSubmit={(e)=>handleSubmit(e)}>

            <Link to="/" className="close-circle" />
          <h2 className="blue">Sign In</h2>
            <input 
              onChange={(e)=>handleChange(e)}
              value={email}
              placeholder={"email"}
              type="email" 
              name="email"/>
            <input 
              onChange={(e)=>handleChange(e)}
              placeholder={"password"}
              type="password" 
              name="password"/>

              <p className="error-text">{auth.error ? auth.error : '' }</p>
              <button className="btn-blue" type="submit">LET'S GO!</button>

              <p className="subtext purple">Still not a member? Create a free account <Link to="/register">here</Link> </p>
          </form>
        </div>
      </div>
    )
}

export default Login
