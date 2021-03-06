import React from 'react';
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

import styles from './PostRowCompact.module.scss';
import { useSelector } from 'react-redux';

const PostRowCompact = ({ post: { title, category, createdOn, _id, user, likes, comments, user: {avatar, name} }}) => {

  const myId = useSelector(state => state.auth.user._id)
  const isMyPost = user._id === myId
  return (
    <div className={styles.postRowCompact}>
      <div className={styles.left}>
        <img className={'round-img'} src={avatar} alt="avatar"/>
        <div className={styles.text}>
          <Link to={`/post/${_id}`}>

            <h4>{title}</h4>
          </Link>
          <p><span className={styles.category}>{category}</span> posted by 
          <Link to={`/profile/${user._id}`}>{ isMyPost ? " Me " :  ` ${name} `}</Link> 
          on {format(new Date(createdOn), 'EEEE MMM dd, yyyy')} </p>
        </div>
      </div>
      <Link to={`/post/${_id}`} className={styles.icons}>
      <i className="far fa-comment-alt"></i><p>{comments.length}</p>
      <i className="far fa-thumbs-up"></i><p>{likes.length}</p>
      </Link>
    </div>
  )

}

export default PostRowCompact;