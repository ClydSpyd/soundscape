import React from 'react'
import { dummyPollData } from '../../dummy_data/poll'
import { Link } from 'react-router-dom'
import PollBlock from '../auxiliary_blocks/PollBlock'
import PostRow from '../posts/PostRow/PostRow'

import styles from './Forums.module.scss'

const BrowseForums = ({ posts }) => {
  return (
    <div className={styles.browseForums}>
      <div className={styles.hero}>
        <h1>Soundscape Forums</h1>
        <h4>Discuss, debate, share, discover</h4>
        <input autoFocus type="search" name="search"/>
      <div className={styles.overlay} />
    </div>

    <div className={styles.categoryBtns}>
      <div className={styles.heading}>Browse by category</div>
      <div className={styles.inner}>
        <Link to="/forums/general" className={`${styles.category} btn-blue_hollow--padding`}>General</Link>
        <Link to="/forums/discoveries" className={`${styles.category} btn-blue_hollow--padding`}>Discoveries</Link>
        <Link to="/forums/announcements" className={`${styles.category} btn-blue_hollow--padding`}>Announcements</Link>
        <Link to="/forums/classifieds" className={`${styles.category} btn-blue_hollow--padding`}>Classifieds</Link>
        <Link to="/forums/gear" className={`${styles.category} btn-blue_hollow--padding`}>Gear Discussion</Link>
        <Link to="/forums/opionios" className={`${styles.category} btn-blue_hollow--padding`}>Opinions</Link>
      </div>
    </div>

    <div className={styles.main}>
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
        </div>
        <div className={styles.posts}>
          {
            posts.map((post, idx) =>  <PostRow key={idx} post={post} /> )
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

        <div className={`${styles.sideBlock}`}>
          <PollBlock pollData = { dummyPollData } />
        </div>

      </div>
    </div>
      
    </div>
  )
}

export default BrowseForums
