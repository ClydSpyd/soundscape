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
import ViewProfile from './ViewProfile';

const Profile = ({ navRef, setShowVideo, toggleModalOverlay }) => {

  const { profileParam } = useParams()
  const profile = useSelector(state => state.profile)
  const user = useSelector(state => state.auth.user)
  const isEdit = profileParam&&profileParam==='edit'
  const isMe = (profileParam&&profileParam==='me')||(user&&profileParam===user._id)

  useEffect(()=>{

    if(!isMe){ store.dispatch(getProfile(profileParam)) }
    

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
            toggleModalOverlay={toggleModalOverlay}
            navRef={navRef} 
            stateProfile={initialProfile} 
            saved={profile.saved}
            saving={profile.saving}/>

      :
        isEdit && profile.me ?
          <EditProfile 
            toggleModalOverlay={toggleModalOverlay}
            navRef={navRef} 
            stateProfile={{...profile.me, genres: typeof !profile.me.genres ? '' : profile.me.genres === 'string' ? profile.me.genres :  profile.me.genres.join(', ')}} 
            saved={profile.saved}
            saving={profile.saving}/>
      :

        isMe && profile.me ?
            <ViewProfile 
              isMe
              userId={user._id}
              setShowVideo={setShowVideo}
              toggleModalOverlay={toggleModalOverlay}
              displayProfile={profile.me} />
              
      :
              
        !isMe && !profile.profile ?
          <h5>no profile found for this user</h5>
      :
              
        !isMe && profile.profile ?
            <ViewProfile 
            userId={profileParam}
            setShowVideo={setShowVideo}
            toggleModalOverlay={toggleModalOverlay}
            displayProfile={profile.profile} />
      :

        <h5>{profile.error}</h5>

      }
    </div>
  )

}

export default Profile;