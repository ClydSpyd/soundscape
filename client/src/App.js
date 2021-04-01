import React, { useEffect, useRef } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { loadUser } from './actions/authActions';
import './styles/App.scss';
import store from './store'

import NavBar from './Components/layout/NavBar';
import Landing from './Components/layout/Landing';
import Login from './Components/auth/Login';
import Register from './Components/auth/Register';
import Dashboard from './Components/dashboard/Dashboard';
import PrivateRoute from './Components/PrivateRoute';
import Profile from './Components/profile/Profile';
import Logout from './Components/auth/Logout';
import Forums from './Components/forums/Forums';
import ModalOverlay from './Components/layout/ModalOverlay';
import { updateModalContent } from './actions/modalContentActions';
import ViewPost from './Components/posts/ViewPost';
import Chat from 'Components/chat/Chat';


const App= () => {

  const location = useLocation()
  const navRef = useRef()
  const modalVis = useSelector(state => state.modalContent.vis)
  
  const toggleModalOverlay = (vis, component) => store.dispatch(updateModalContent({vis, component}))

  useEffect(()=>{ store.dispatch(loadUser()) },[])
  useEffect(()=>{store.dispatch(updateModalContent({vis:false, component:null}))},[location])


  return (

    <>
      <Switch> {/* navbar switch  */}
        <Route exact path="/" component={null} />
        <Route exact path="/login" component={null} />
        <Route exact path="/register" component={null} />
        <Route exact path="/profile/edit" component={()=><NavBar profile navRef={navRef} />} />
        <Route path="/profile/:id" component={()=><NavBar profile clear navRef={navRef} />} />
        <Route path="/:section?" component={()=><NavBar profile navRef={navRef} />} />
      </Switch>

      <Switch> {/* main switch  */}
        <Route exact path="/" component={Landing} />

        <Route exact path="/login" component={Login} />

        <Route exact path="/logout" component={Logout} />

        <Route exact path="/register" component={Register} />

        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        
        <PrivateRoute exact path="/inbox" component={()=> <Chat />} />

        <Route path="/forums/:category?" component={()=> 
          <Forums toggleModalOverlay={toggleModalOverlay}/>} />

        <PrivateRoute exact path="/profile/:profileParam?" component={()=> 
          <Profile navRef={navRef} toggleModalOverlay={toggleModalOverlay} />} />

        <Route exact path ="/post/:postId" component={()=>  <ViewPost />} />
      </Switch>

      { modalVis && 
        <ModalOverlay closeModal = {()=> toggleModalOverlay(false, null) }/> }
      

    </>
  );
}

export default App;




// import React, { useState, useEffect } from "react";
// import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:5000";

// function App() {
//   const [response, setResponse] = useState("");

//   useEffect(() => {
//     const socket = socketIOClient(ENDPOINT);

//   }, []);

//   return (
//     <p>
//       It's hemlo
//     </p>
//   );
// }

// export default App;