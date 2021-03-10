import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { dummyDicoveries } from '../../dummy_data/discoveries';
import LoaderDiv from '../layout/loaderDiv';


import styles from './Dashboard.module.scss';
import DashboardPosts from './DashboardPosts';
import DashSidebar from './DashSidebar';
import DiscoveryItem from './DiscoveryItem';

const Dashboard = () => {

  const auth = useSelector(state => state.auth)
  const profile = useSelector(state => state.profile)
  const { loading, user } = auth;

  return (
    <div className="section-container left-top-padd shift-down full-width flex">

      {
        user && user.name && profile && !profile.loading ?
          <>

            <DashSidebar user={user} />
            <div className={styles.main}>

              <div className={styles.discoveries}>
                <h5>Top Discoveries <span><Link to="/discoveries">more</Link></span></h5>
                <div className={styles.items}>
                  {
                    dummyDicoveries.map((item, idx) => <DiscoveryItem item={item} key={idx}/>)
                  }
                </div>
              </div>

              <h5>Top Posts <span><Link to="/forums">more</Link></span></h5>
              <DashboardPosts />

            </div>
          </>

        :

              <LoaderDiv propClass="shift-up" />
        }


    </div>

  )
}

export default Dashboard
