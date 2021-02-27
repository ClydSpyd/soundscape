import React, { useEffect, useRef } from 'react';
import { Route, Switch } from 'react-router-dom'

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


const App= () => {

  const navRef = useRef()
  useEffect(()=>{ store.dispatch(loadUser()) },[])

  return (

    <>
      <Switch> {/* navbar switch  */}
        <Route exact path="/" component={null} />
        <Route exact path="/login" component={null} />
        <Route exact path="/register" component={null} />
        <Route path="/:section?" component={()=><NavBar navRef={navRef} />} />
      </Switch>

      <Switch> {/* main switch  */}

        <Route exact path="/" component={Landing} />

        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/register" component={Register} />

        <PrivateRoute exact path="/profile/:profileParam?" component={()=> <Profile navRef={navRef}  />} />

        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>

    </>
  );
}

export default App;
