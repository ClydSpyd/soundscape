import axios from 'axios'
import setAuthToken from '../helpers/setAuthToken';

export const fetchAllPosts = () => async dispatch => {

  dispatch({ type: "POST_QUERY", })

  try {
    const res = await axios.get('http://localhost:5000/api/posts')

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

//>>>

export const fetchSinglePost = (post_id) => async dispatch => {

  dispatch({ type: "POST_QUERY", })

  try {    
    
    const res = await axios.get(`http://localhost:5000/api/posts/${post_id}`)

    dispatch({ 
      type: 'POST_RETREIVED',
      payload: res.data
    })
  
    
  } catch (err) {
    
    console.log(err.response)

    dispatch({ 
      type: 'POST_ERROR', 
      payload:err.response})
  
  }
}

//>>>

export const createNewPost = (postObject) => async dispatch => {
  
  dispatch({ type: "POST_QUERY", })
  
  const token = localStorage.getItem('t')
  if(token)(setAuthToken(token))

  try {

    const config = { headers: { 'Content-Type': 'application/json' } }
    const body = JSON.stringify( postObject )

    const res = await axios.post('http://localhost:5000/api/posts', body, config)

    console.log(res)

    setTimeout(()=>{
      dispatch({ 
        type: 'POST_SUCCESS',
        payload:res.data.posts
       })
    }, 500)
    
  } catch (err) {
    
    console.log(err)
    console.log(err)
    dispatch({ type: 'POST_ERROR', payload:'ERROR' })
    
  }

}

//>>>

export const likePost = ( post_id ) => async dispatch => {

  try {
        
    const res = await axios.post(`http://localhost:5000/api/posts/like/${post_id}`)

    dispatch({ 
      type: 'POST_LIKED',
      payload: res.data
    })
  
    
  } catch (err) {

    console.log(err.response)

  }

}

// //>>>

// export const postComment = ( post_id ) => async dispatch => {

//   try {

//     const res = await axios.post(`http://localhost:5000/api/posts/comment/${post_id}`);

//     dispatch({
//       type:'COMMENT_POSTED',
//       payload: res.data
//     })
    
//   } catch (err) {
        
//     console.log(err.response.data)
//     dispatch({ type: 'POST_ERROR', payload:err.response.data.errors[0] })
    
//   }

// }

//>>>

export const postComment = ( postId, commentObject ) => async dispatch => {

  const token = localStorage.getItem('t')
  if(token)(setAuthToken(token))

  console.log(postId)
  console.log(commentObject)

  try {

    const config = { headers: { 'Content-Type': 'application/json' } }
    const body = JSON.stringify( commentObject )

    console.log(`http://localhost:5000/api/posts/comment/${postId}`)
    console.log(body)

    const res = await axios.post(`http://localhost:5000/api/posts/comment/${postId}`, body, config)

    console.log(res)
    
    dispatch({
      type:'COMMENT_POSTED',
      payload: res.data
    })
    
  } catch (err) {
    
    console.log(err.response)
    
    const payloadError = err.response.data.msg ? err.response.data.msg : err.response.data
    
    console.log(payloadError)
    dispatch({ type: 'POST_ERROR', payload:payloadError })
    
  }

}

//>>>

export const postErrorRefresh = () => {
  return {type:'POST_ERROR_REFRESH'}
}



