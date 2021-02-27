import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {

  const auth = useSelector(state => state.auth)

  useEffect(()=>{
    console.log(rest)
  },[])

  return (

    <Route
      {...rest}
      render={props =>
        !auth.isAuthenticated && !auth.loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />

  )

}

export default PrivateRoute
