import React, { useEffect, useRef, useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom'

import Landing from './Components/layout/Landing';
import Dashboard from './Components/dashboard/Dashboard';
import PrivateRoute from './Components/PrivateRoute';
import './styles/App.scss';
import { loadUser } from './actions/authActions';
import Login from './Components/auth/Login';
import store from './store'
import NavBar from './Components/layout/NavBar';
import Register from './Components/auth/Register';
import Profile from './Components/profile/Profile';
import Logout from './Components/auth/Logout';
import VideoPlayerModal from './Components/layout/VideoPlayerModal';
import Forums from './Components/forums/Forums';


const App= () => {

  const location = useLocation()
  const navRef = useRef()
  const [ videoOverlay, setVideoOverlay ] = useState({vis:false, url:''})
  const setShowVideo = (vis, url) => { setVideoOverlay({vis:vis, url:url}) }
  useEffect(()=>{ store.dispatch(loadUser()) },[])
  useEffect(()=>{setShowVideo(false,null); console.log(location)},[location])

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
        <Route exact path="/forums" component={Forums} />

        <PrivateRoute exact path="/profile/:profileParam?" component={()=> 
          <Profile 
            navRef={navRef}  
            setShowVideo={setShowVideo}/>} />

        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>


      {videoOverlay.vis && 
        <VideoPlayerModal 
          setShowVideo={setShowVideo} 
          url={videoOverlay.url} 
          height='428px'
          width='760px' />
        }

    </>
  );
}

export default App;
