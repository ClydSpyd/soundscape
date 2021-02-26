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

const Profile = () => {

  const { profileParam } = useParams()
  const profile = useSelector(state => state.profile)
  const isEdit = profileParam&&profileParam==='edit'
  const isNotMe = profileParam&&profileParam!=='edit'

  useEffect(()=>{

    if(isNotMe){

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
            stateProfile={initialProfile} 
            saving={profile.saving}/>

      :
        isEdit && profile.me ?
          <EditProfile 
            stateProfile={{...profile.me, genres: typeof profile.me.genres === 'string' ? profile.me.genres :  profile.me.genres.join(',')}} 
            saving={profile.saving}/>
      :

        !isNotMe && profile.me ?
            <EditProfile stateProfile={profile.me} />
      :

        isNotMe && profile.profile ?
          <h5>success</h5>
      :

        profile.error &&
          <h5>{profile.error}</h5>

      }
    </div>
  )

}

export default Profile;