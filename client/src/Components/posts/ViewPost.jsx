import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchSinglePost, likePost, postComment, postErrorRefresh } from '../../actions/postActions';
import store from '../../store';
import LoaderDiv from '../layout/loaderDiv';
import DOMPurify from 'dompurify';
import styles from './ViewPost.module.scss';
import { format } from 'date-fns';
import PostComment from './PostComment/PostComment';


const ViewPost = () => {

  const { postId } = useParams()
  const { loading, post } = useSelector( state => state.post )
  const { user } = useSelector( state => state.auth )
  const isAuthenticated = useSelector(state=>state.auth.isAuthenticated)
  const postError = useSelector(state => state.post.error)
  const [ isLiked, setIsLiked ] = useState(false)
  const [ commentVis, setCommentVis ] = useState(false)
  const [ commentInputText, setInputText ] = useState('');


  useEffect(()=>{ 
    store.dispatch(fetchSinglePost(postId)) 
  },[])

  const handleNewCommentClick= () => {
    console.log('handleNewCommentClick'); 
    setCommentVis(true); 
    store.dispatch(postErrorRefresh())
  }

  // useEffect(()=>{
  //   console.log(commentVis)
  //   if(commentVis){store.dispatch(postErrorRefresh()); console.log('refresh')}
  // },[commentVis])

  // useEffect(()=>{if(postError)setCommentVis(false)},[postError])

  useEffect(()=>{ 
    // refresh on redux post update
    setCommentVis(false)
    if(post&&post.likes){ setIsLiked(post.likes.some(like => like.user === user._id)) }
  },[post])

  const handleSubmit = () => {
    const commentObject = { text: commentInputText };
    // const commentObject = { };
    store.dispatch(postComment(postId, commentObject))
    setInputText('')

  }
  const errorRefresh = () => {
    store.dispatch(()=>{
      return{
        type:'POST_ERROR_REFRESH'
      }
    })
  }

  return (
    <div className={`${styles.viewPost}`}>
      

        {
          loading || ( !post.title ) ? <LoaderDiv />
          
          : 
            
            <>

              <section className={styles.postContainer}> 

                <section className={styles.userDiv}>
                  <img className={`round-img`} src={post.user.avatar} alt="user img"/>

                  <div className={styles.info}>
                    <Link to={`/profile/${post.user._id}`}>{post.user.name}</Link>
                    <h5 className="purple">{post.status}, {post.location}</h5>
                    <Link to={`/forums/${post.category}`} >
                      Posted in <span className={styles.category}>{post.category}</span>
                    </Link>
                    <p>{ format(new Date(post.createdOn), 'EEE do MMM yyyy, kk:mm:ss') }</p>
                  </div>
                </section>

                <section className={styles.main}>
                  <div className={styles.postTitle}><h2>{post.title}</h2></div>
            
                  { <div className={styles.postBody} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.textHTML) }} /> }
                </section>

              </section>


            <section className={styles.lowerSection}>

              <div className={`${styles.topBar}  blockHeading`}>

                <h4 className={`${styles.commentsHeader}`}>
                  Comments <span>({post.comments.length})</span>
                </h4>


                {isAuthenticated &&
                
                  <div className={`${styles.newCommentBtn} ${commentVis && !postError && 'zero-opacity'} btn-blue_hollow`}
                    onClick={handleNewCommentClick}>New Comment<span >+</span> </div>
                    
                }

                { postError && <div className={styles.postErrorMsg}>{"Something went wrong :("}</div>}

                <div onClick={() => store.dispatch(likePost(post._id))} className={`${styles.likes} ${isLiked && styles.liked}`}>
                  <i className="far fa-thumbs-up"></i><p>{post.likes.length}</p>
                </div>

              </div>


              <div className={`${styles.newCommentCont} ${commentVis && !postError && styles.open}`}>
                <div className={styles.inputCont}>
                  {commentVis &&
                    <textarea
                      value={commentInputText}
                      onChange={e => setInputText(e.target.value)}
                      placeholder={"New comment"}
                      autoFocus />}
                </div>

                <div className={styles.newCommentButtons}>
                  <div onClick={handleSubmit} className={`${commentInputText === '' && 'disabled'} btn-blue`}>Submit</div>
                  <div onClick={e => { setCommentVis(false); setInputText(''); errorRefresh() }} className={`btn-purple_hollow`}>Cancel</div>
                </div>
              </div>

              <div className={styles.comments}>
                {
                  post.comments.map(comment => {
                    return(
                      <PostComment comment={comment} />
                    )
                  })
                }
              </div>


            </section>

            </>
        }

    </div>
  )

}

export default ViewPost;