import React from 'react'
import { useSelector } from 'react-redux'
import { Link, NavLink, useHistory } from 'react-router-dom'
import { logout } from '../../actions/authActions'
import store from '../../store'

const NavBar = ({landing, navRef}) => {

  const auth = useSelector(state => state.auth)
  const history = useHistory()
  const handleLogout = () => { store.dispatch( logout(history) )}

  const authLinks = (
    <ul>
      <li><NavLink activeClassName="nav_active" to="/profile/me"><i className="fas fa-user"></i>{'  '} <span className="hide.sm">Profile</span></NavLink></li>
      <li><NavLink activeClassName="nav_active" to="/posts">Forums</NavLink></li>
      <li><NavLink activeClassName="nav_active" to="/inbox">Inbox</NavLink></li>
      <li><NavLink activeClassName="nav_active" to="/logout"> <i className="fas fa-sign-out-alt"></i>{' '} <span className="hide.sm">logout</span></NavLink> </li>
    </ul>
  )

  const guestLinks = (
    <ul>
      <li><Link to="/posts">Forums</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/register"><span className="hide.sm">Sign up</span></Link></li>
     
    </ul>
  )

  return landing ? null

  :
  
    (
      <nav ref={navRef} className={`${'navbar bg-dark'} ${landing && 'landing'}`}>

        <Link to="/">
          <h4 className={"nav-logo"}>soundscape</h4>
        </Link>

        { auth.isAuthenticated ? authLinks : guestLinks }

      </nav>
    )
}

export default NavBar
