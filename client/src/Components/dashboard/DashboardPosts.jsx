import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchAllPosts } from '../../actions/postActions';
import { dummyPosts } from '../../dummy_data/posts';
import store from '../../store';
import PostRowCompact from '../posts/PostRowCompact';

import styles from './DashboardPosts.module.scss';

const DashboardPosts = () => {

  useEffect(()=>{ store.dispatch( fetchAllPosts() ) },[])

  const statePosts = useSelector(state => state.post.posts)

  return (
    <div className={styles.dashPosts}>
      <div className={styles.topBar}>
        <div className={styles.pill}>Top-Rated</div>
        <div className={styles.pill}>Newest</div>
        <div className={styles.pill}>All categories <i className="fas fa-sort-down"></i></div>
      </div>

      <div className={styles.posts}>
        {
          statePosts.map((post, idx) => <PostRowCompact key={idx} post={post}  /> )
        }
      </div>
    </div>
  )

}

export default DashboardPosts;