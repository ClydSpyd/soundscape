import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import titleCase from '../../helpers/titleCase';
import PostRow from '../posts/PostRow/PostRow'

import styles from './Forums.module.scss';
import NewPostModal from './NewPostModal';

const ForumsCategory = ({ posts, category, toggleModalOverlay }) => {

  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

  },[])

  const setActive = (string) => {
    if(category===string)return styles.active
  }

  const handleModal = () => {
    toggleModalOverlay(true, <NewPostModal category={category}/>)
  }

  return (
    <div className={`${styles.main} ${styles.forumsCategory} shift-down`}>
    
    <div className={styles.right}>
    <div className={styles.categoryBtns}>
      <div className={styles.heading}>Go to category</div>
      <div className={styles.inner}>
      
        <Link to={"/forums"}  className={`${styles.categoryRadio} btn-blue_hollow--padding`}>
          <i class="fas fa-home"></i>{" "}Forums Home
        </Link>
  
        <Link to={"/forums/general"} className={`${styles.categoryRadio} ${setActive('general')} btn-blue_hollow`}> General </Link>
  
        <Link to={"/forums/discoveries"} className={`${styles.categoryRadio} ${setActive('discoveries')} btn-blue_hollow`}> Discoveries </Link>
  
        <Link to={"/forums/announcements"} className={`${styles.categoryRadio} ${setActive('announcements')} btn-blue_hollow`}> Announcements </Link>

        <Link to={"/forums/classifieds"} className={`${styles.categoryRadio} ${setActive('classifieds')} btn-blue_hollow`}> Classifieds </Link>

        <Link to={"/forums/gear"} className={`${styles.categoryRadio} ${setActive('gear')} btn-blue_hollow`}> Gear Discussion </Link>

        <Link to={"/forums/opinions"} className={`${styles.categoryRadio} ${setActive('opinions')} btn-blue_hollow`}> Opinions </Link>

      </div>
    </div>
      <div className={`${styles.sideBlock} ${styles.stats}`}>
        <h4 className={"blockHeading"}>Stats this week:</h4>

        <div className={styles.statRow}>
          <i class="fas fa-plus-square"></i>
          <p>Posts (279)</p>
        </div>

        <div className={styles.statRow}>
          <i class="fas fa-comment-alt"></i>
          <p>Comments (357)</p>
        </div>

        <div className={styles.statRow}>
          <i class="fas fa-user-friends"></i>
          <p>Active Users (109)</p>
        </div>
      </div>

    </div>
    <div className={styles.left}>
      <div className={styles.radios}>
        <div className={styles.filterTabs}>
          <label>
            <input defaultChecked={true} type="radio" name="filterOption" value="top"/>
            <div className={styles.filterOption}>Top Posts</div>
          </label>
          <label>
            <input type="radio" name="filterOption" value="mostRecent"/>
            <div className={styles.filterOption}>Recent Posts</div>
          </label>
          <label>
            <input type="radio" name="filterOption" value="mostLiked"/>
            <div className={styles.filterOption}>Popular Posts</div>
          </label>
        </div>
        <div onClick={handleModal} className={styles.newPostBtn}>
        <i class="far fa-edit"></i>{" "} <p>New Post</p>
        </div>
      </div>
      <div className={styles.posts}>
        {
          posts.map((post, idx) => post.category===category && <PostRow isCategory key={idx} post={post} /> )
        }
      </div>
    </div>

  </div>
  )

}

export default ForumsCategory;