import axios from 'axios'
import setAuthToken from '../helpers/setAuthToken';

export const fetchAllPosts = () => async dispatch => {

  dispatch({ type: "POST_QUERY", })

  try {
    const res = await axios.get('http://localhost:5000/api/posts')

    console.log(res)
    dispatch({ 
      type: 'POSTS_RETREIVED',
      payload: res.data
    })
    
  } catch (err) {
    
    console.log(err.response)

    dispatch({ 
      type: 'POST_ERROR', 
      payload:err.response})
    
  }



}


export const createNewPost = (postObject) => async dispatch => {
  
  dispatch({ type: "POST_QUERY", })
  
  const token = localStorage.getItem('t')
  if(token)(setAuthToken(token))

  try {

    const config = { headers: { 'Content-Type': 'application/json' } }
    const body = JSON.stringify( postObject )

    const res = await axios.post('http://localhost:5000/api/posts', body, config)

    console.log(res)
    dispatch({ type: 'POST_SUCCESS' })
    
  } catch (err) {
    
    console.log(err.response.data)
    dispatch({ type: 'POST_ERROR', payload:err.response.data.errors[0] })
    
  }

}