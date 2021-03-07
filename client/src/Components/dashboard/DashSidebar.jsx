import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import profilePic from '../../assets/img/default_profile_pic.png'

import styles from './DashSidebar.module.scss';

const DashSidebar = ({user:{name, avatar}}) => {

  const profile = useSelector(state => state.profile)

  return profile && !profile.loading && (
    <div className={styles.dashSidebar}>
      <div className={styles.header}>
        <img src={avatar} alt="Profile pic"/>
        <h3>{name}</h3>

        {
          !profile.me ?
            <div style={{margin:'10px auto'}} >
              <h6 style={{textAlign:'center', marginBottom:'5px'}}>no profile information</h6>
              <Link to="/profile/edit"> <div  className={'btn-blue'}>Create my profile</div> </Link>
            </div>
        :

            <>

              <h5 >{profile.me.location}</h5>
              <h6 className={"blue"}>{profile.me.status}</h6>
              <p className="purple-hover">5 projects</p>
              <p className="purple-hover">34 posts</p>

              <div className={styles.links}>
                <Link to="/profile/edit">edit profile</Link>
                <div className={styles.break} />
                <Link to="/settings">settings</Link>
                {/* <div className={styles.break} />
                <Link to="/alerts">alerts (0)</Link> */}
              </div>
            </>
        }
        
      </div>
      <div className={styles.linkBlock}> Discover Music </div>
      <div className={styles.linkBlock}> Browse Forums </div>
      <div className={styles.linkBlock}> Find Groups </div>
      <div className={styles.linkBlock}> Browse Users </div>
      <div className={styles.linkBlock}> Create New Post </div>
    </div>
  )

}

export default DashSidebar;