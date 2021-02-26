import axios from 'axios'
import setAuthToken from '../helpers/setAuthToken';

export const getProfile = (profileId) => async dispatch => {
  

  const token = localStorage.getItem('t')
  if(token)(setAuthToken(token))

  const fetchUrl = profileId ? `/api/profile/${profileId}` : '/api/profile'

  console.log(fetchUrl)

  dispatch({type:'PROFILE_LOADING'})

  try {

    const res = await axios.get(fetchUrl)

    dispatch({
      type: !profileId ? 'MY_PROFILE_RETRIEVED' : 'PROFILE_RETRIEVED',
      payload: res.data
    })
    
  } catch (err) {
    
    console.log('GET PROFILE ERROR')
    console.log(err.response)

    
    dispatch({
      type: 'PROFILE_ERROR',
      payload: err.response
    })

  }

}

export const saveProfile = (formData, history) => async dispatch => {
  
  console.log('save_profile')
  console.log(formData)

  const config = { headers: { 'Content-Type': 'application/json' } }
  const token = localStorage.getItem('t');
  if(token) setAuthToken(token)
  const body = JSON.stringify( formData )

  try {

    const res = await axios.post('/api/profile', body, config);

    console.log(res)

    dispatch({ 
      type: "SAVE_PROFILE",
      payload: formData 
    })

    history.push("/")
    
  } catch (err) {
     const errors = err&&err.response ? err.response.data.errors : null;
    console.log('PROFILE EDIT FAILURE')
    errors && errors.forEach(error => console.log(error.msg))

    dispatch({
      type:  'PROFILE_EDIT_FAILURE'
    })

  }


}




export const clearProfile = () =>  dispatch => {

  dispatch({ type: "CLEAR_PROFILE" })
}






// //create profile
// export const createProfile = ( profileObject, history, edit = false ) => async dispatch => {
  
//   const config = { headers: { 'Content-Type': 'application/json' } }
//   const body = JSON.stringify( profileObject )
  
//   try {
    

//     const res = await axios.post('/api/profile', body, config);

//     console.log(res)
//     dispatch({
//       type: PROFILE_EDIT_SUCCESS,
//       payload: res.data
//     })

//     dispatch( setAlert( edit ? 'Profile updated' : 'Profile created', 'success'))

//     if(!edit){setTimeout(()=>{ history.push("/dashboard") },500)}
    
    
//   } catch (err) {

//     const errors = err&&err.response ? err.response.data.errors : null;

//     errors && errors.forEach(error => dispatch(setAlert(error.msg, 'warning')))

//     dispatch({
//       type:  PROFILE_EDIT_FAILURE
//     })

//   }
// }