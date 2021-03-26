import React from 'react';
import { format } from 'date-fns'

import styles from './PostComment.module.scss';
import { Link } from 'react-router-dom';

const PostComment = ({ comment:{ user, name, avatar, text, createdOn }}) => {

  return (
    <div className={styles.postComment}>
      <div className={styles.text}>
        <i class="fas fa-quote-left"></i>
        <h5>{text}</h5>
        <i class="fas fa-quote-right"></i>
      </div>

      <div className={styles.postDetails}>
        <p className={`${styles.date}`}>{format(new Date(createdOn), 'EEE do MMM yyyy, kk:mm:ss') }</p>
        <Link to={`/profile/${user}`}  className={`${styles.name} purple`}>{name}</Link>
        <Link to={`/profile/${user}`} ><img src={avatar} alt="user img"/></Link>
      </div>
    </div>
  )

}

export default PostComment;