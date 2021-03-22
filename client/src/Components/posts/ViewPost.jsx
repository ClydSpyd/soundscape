import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchSinglePost, likePost } from '../../actions/postActions';
import store from '../../store';
import LoaderDiv from '../layout/loaderDiv';
import DOMPurify from 'dompurify';
import styles from './ViewPost.module.scss';
import { format } from 'date-fns';


const ViewPost = () => {

  const { postId } = useParams()
  const { loading, post } = useSelector( state => state.post )
  const { user } = useSelector( state => state.auth )
  const [ isLiked, setIsLiked ] = useState(false)


  useEffect(()=>{ 
    store.dispatch(fetchSinglePost(postId)) 
  },[])

  useEffect(()=>{ 
    if(post&&post.likes){ setIsLiked(post.likes.some(like => like.user === user._id)) }
  },[post])

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
                    <Link to={`/profile/${post._id}`}>{post.user.name}</Link>
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
                  <h4 className={`${styles.commentsHeader}`}>Comments <span>({post.comments.length})</span></h4>
                  <div onClick={()=> store.dispatch( likePost(post._id) ) } className={`${styles.likes} ${isLiked && styles.liked}`}> <i className="far fa-thumbs-up"></i><p>{post.likes.length}</p> </div>
                </div>
              </section>

            </>
        }

    </div>
  )

}

export default ViewPost;