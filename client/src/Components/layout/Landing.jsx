import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom'
import logo from '../../assets/img/logos/soundscape-hollow_white.png';
import LoaderDiv from '../layout/loaderDiv';

const Landing = () => {

  const auth = useSelector(state => state.auth)
  const innerRef=useRef()

  useEffect(()=>{
    setTimeout(()=>{
      if(innerRef.current){innerRef.current.classList.remove('zero-opacity')}
    },100)
  },[])


  return auth.isAuthenticated ? 
    <Redirect to="/dashboard"/> 
    
  :
  
    auth.loading ?
      <LoaderDiv propClass="overlay shift-down" />
        
  :
    (
      <div className="principal-container">

        <div ref={innerRef} className="landing-inner zero-opacity">
          <img className={"logo-main"} src={logo} alt="logo"/>
          <h3 className="medium purple">Welcome to Soundscape Online</h3>
          <h1 className="m-0">A PLACE FOR MUSIC LOVERS</h1>
          <div className="flex-center">
            <Link to="/login" className="btn-blue_hollow">Sign in</Link>
            <Link to="/register" className="btn-purple_hollow">Create account</Link>
          </div>
        </div>
      </div>
    )
}

export default Landing
