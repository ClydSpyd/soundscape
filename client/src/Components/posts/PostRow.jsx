import React from 'react';
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

import styles from './PostRow.module.scss';

const PostRow = ({post: { 
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
      <p>Posted by <Link to={`/profile/${user._id}`}>{name}</Link> in <span className={styles.category}>{category}</span>  on {format(date, 'EEEE MMM dd, yyyy')} </p>
      </div>

    </div>
  )

}

export default PostRow;