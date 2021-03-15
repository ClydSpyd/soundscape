import React from 'react';
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

import styles from './PostRow.module.scss';

const PostRow = ({
  isCategory,
  post: { 
  _id, 
  title, 
  text, 
  category, 
  likes, 
  comments, 
  date,
  user, 
  user: { 
    name, 
    avatar
  }}}) => {

    const postDate = format(date, 'EEEE MMM dd, yyyy')

  return (
    <div className={styles.postRow}>
      <div className={styles.top}>
        <img src={avatar} alt="user img"/>
        <div className={styles.text}>
          <h3>{title}</h3>
          <p>{text}</p>
        </div>
      </div>
      <div className={styles.bottom}>
        {
          !isCategory ?
          
            <p>Posted by <Link to={`/profile/${user._id}`}>{name}</Link> in <span className={styles.category}>{category}</span> on {postDate}</p>
          :
            <p>Posted by <Link to={`/profile/${user._id}`}>{name}</Link> on {postDate}</p>

        }

      <Link to={`/post/${_id}`} className={styles.icons}>
        <i className="far fa-comment-alt"></i><p>{comments}</p>
        <i className="far fa-thumbs-up"></i><p>{likes}</p>
      </Link>
      </div>

    </div>
  )

}

export default PostRow;