import React from 'react'
import bgImg from '../../assets/img/showcase_img.jpg'
import { dummyPosts } from '../../dummy_data/posts'
import PostRow from '../posts/PostRow'

import styles from './Forums.module.scss'

const BrowseForums = () => {
  return (
    <div className={styles.browseForums}>
      <div className={styles.hero}>
        <h1>Soundscape Forums</h1>
        <h4>Discuss, debate, buy, sell, share or discover... this is the place to do it</h4>
        <input autoFocus type="search" name="search"/>
      <div className={styles.overlay} />
    </div>

    <div className={styles.categoryBtns}>
      <div className={styles.heading}>Browse by category</div>
      <div className={styles.inner}>
        <div className={`${styles.category} btn-blue_hollow--padding`}>General</div>
        <div className={`${styles.category} btn-blue_hollow--padding`}>Discoveries</div>
        <div className={`${styles.category} btn-blue_hollow--padding`}>Announcements</div>
        <div className={`${styles.category} btn-blue_hollow--padding`}>Classifieds</div>
        <div className={`${styles.category} btn-blue_hollow--padding`}>Gear Discussion</div>
        <div className={`${styles.category} btn-blue_hollow--padding`}>Opinions</div>
      </div>
    </div>

    <div className={styles.main}>
      <div className={styles.left}>
        <div className={styles.radios}>
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
        <div className={styles.posts}>
          {
            dummyPosts.map((post, idx) =>  <PostRow key={idx} post={post} /> )
          }
        </div>
      </div>

      <div className={styles.right}>
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
        <div className={`${styles.sideBlock} ${styles.poll}`}>
          <h4 className={"blockHeading"}>Poll of the week</h4>

        </div>
      </div>
    </div>
      
    </div>
  )
}

export default BrowseForums
