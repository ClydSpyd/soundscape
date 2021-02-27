import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearProfile, getProfile } from '../../actions/profileActions';
import store from '../../store';
import LoaderDiv from '../layout/loaderDiv';
import EditProfile from './EditProfile';
import CreateProfile from './CreateProfile';
import { initialProfile } from '../../reducers/defaultProfile';

import styles from './Profile.module.scss';

const Profile = ({ navRef }) => {

  const { profileParam } = useParams()
  const profile = useSelector(state => state.profile)
  const isEdit = profileParam&&profileParam==='edit'
  const isMe = profileParam&&profileParam==='me'

  useEffect(()=>{

    if(!isMe){

      store.dispatch(getProfile(profileParam))
      console.log('fetch user profile')
      console.log(profileParam)
    }
    

  },[])

  return (
    <div className={`section-container ${styles.profileContainer}`}>

      { profile.saving && <LoaderDiv propClass="overlay"/> }
      
      {


        profile.loading ?
          <LoaderDiv />

        :
        isEdit && !profile.me ?
          <EditProfile 
            navRef={navRef} 
            onLeave={()=>window.alert('hemlo')}
            stateProfile={initialProfile} 
            saved={profile.saved}
            saving={profile.saving}/>

      :
        isEdit && profile.me ?
          <EditProfile 
            navRef={navRef} 
            onLeave={()=>window.alert('hemlo')}
            stateProfile={{...profile.me, genres: typeof profile.me.genres === 'string' ? profile.me.genres :  profile.me.genres.join(', ')}} 
            saved={profile.saved}
            saving={profile.saving}/>
      :

        isMe && profile.me ?
            <h6>my profile</h6>
      :

        !isMe && profile.profile ?
          <h5>success</h5>
      :

        profile.error &&
          <h5>{profile.error}</h5>

      }
    </div>
  )

}

export default Profile;