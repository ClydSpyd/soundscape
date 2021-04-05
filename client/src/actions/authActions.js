import axios from 'axios'
import setAuthToken from '../helpers/setAuthToken';
import { getProfile } from './profileActions';
import { clearProfile } from './profileActions'

export const loadUser = () => async dispatch => {
  console.log('LOAD USER')
  const token = localStorage.getItem('t')
  if(token)(setAuthToken(token))

  try {

    const res = await axios.get('/api/auth')

    dispatch({
      type: 'USER_LOADED',
      payload: res.data.user
    })

    dispatch( getProfile() )

    
  } catch (err) {

    console.log('LOAD USER ERROR')
    console.log(err.response)

    
    dispatch({
      type: 'AUTH_ERROR'
    })
  }

}

export const loginUser = ({email, password}) => async dispatch => {
 
  const config = { headers: { 'Content-Type': 'application/json' } }
  const body = JSON.stringify({ email, password })

  console.log(body)

  try {

    const res = await axios.post('api/auth', body, config)

    dispatch({
      type: 'USER_LOGGEDIN',
      payload: res.data.token
    })

    dispatch( loadUser() )
    
  } catch (err) {


    // const errors = err.response.data.errors;
    console.log(err.response.status)
    
    dispatch({
      type: 'AUTH_ERROR',
      payload: err.response.status
    })
  }
}


//register user
export const registerUser = ({ name, email, password }) => async dispatch => {

  const config = { headers: { 'Content-Type': 'application/json' } }
  const body = JSON.stringify({ name, email, password })
  console.log({ name, email, password })
  console.log(body)

  try {

    const res = await axios.post('api/users', body, config);

    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: res.data.token
    })

    dispatch( loadUser() )
    
  } catch (err) {

    const errors = err.response.data.errors;

    dispatch({
      type: 'REGISTER_FAIL',
      payload:errors[0].msg
    })

  }
}


export const logout = (history) => dispatch => {

  dispatch({ type: "LOGOUT" })
  dispatch( clearProfile() )
  history.push("/")
  
}

export const setError = (text) => dispatch => {

  dispatch({
    type: "SET_ERROR",
    payload: text
  })

}

export const clearError = () => dispatch => {

  dispatch({
    type: "CLEAR_ERROR"
  })

}