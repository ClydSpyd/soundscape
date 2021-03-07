import React, { useState, useEffect, useRef } from 'react';
import { CountryDropdown } from 'react-country-region-selector';
import store from '../../store';
import {isEqual} from 'lodash';
import { Prompt } from 'react-router'

import styles from './Profile.module.scss';
import { saveProfile, uploadImage } from '../../actions/profileActions';
import { useHistory } from 'react-router-dom';
import BlockNavigationModal from '../utility_comps/BlockNavigationModal';

const EditProfile = ({ stateProfile, saving, saved, navRef }) => {

  
  const [ isEqualState, setIsEqualState ] = useState(true)
  const [ formData, setFormData ] = useState(stateProfile)
  const [ navConfirm, setNavConfirm ] = useState(false)
  const [ picSaved, setPicSaved ] = useState(false)
  const history = useHistory()
  const contRef = useRef()


  useEffect(()=>{
    setTimeout(()=>{
      if(contRef.current){contRef.current.classList.remove('zero-opacity')}
    },100)

  },[])


  const {
    avatar,
    location,
    bio,
    genres,
    status,
    projects, // @TODO - deal with projects being passed/created by user on profile
    spotify,
    soundcloud,
    youtube,
    facebook,
    instagram,
    twitter
  } = formData


  useEffect(()=>{
    if(!isEqual( formData, stateProfile)){
      setIsEqualState(false)
    } else {
      setIsEqualState(true)
    }

  },[formData])

  useEffect(()=>{ 
    if(!saving){
      setIsEqualState(true);
    } 
  },[saving])

  const handleSubmit = () => {
    
    store.dispatch( saveProfile({
      ...formData, 
      genres: typeof genres !== "string" ? genres : genres.split(',').map(genre => genre.trim())
      }, history) 
    )

  }

  const handleChange = (e, arg) => {

    store.dispatch({type:'PROFILE_UNSAVED'})

    arg ?
      setFormData({ //update location comp state
          ...formData, 
          location: e
        })

    :
          
      setFormData({// update other comp states
        ...formData, 
        [e.target.name]:e.target.value
      }) 

  }

  return (
    <div ref={contRef} className={`${styles.editProfile} zero-opacity shift-down`}>
          <Prompt
            when={!isEqualState}
            message={(location, action) => {
              setNavConfirm({vis: true, path: location.pathname})
              return false 
            }}
          />

         {navConfirm.vis &&  
            <BlockNavigationModal 
              refs={[navRef]}
              path={navConfirm.path} 
              cancel={()=>setNavConfirm({...navConfirm, vis:false})}
              permit={()=>setIsEqualState(true)}
              text={{
                warning:"You have unsaved changes, are you sure you wish to leave the page?"
              }}/>
          }

        <div className={styles.header}>
          <h2 className="blue">Edit profile</h2>
          <div onClick={handleSubmit} 
          className={
            `${styles.saveBtn} 
            ${!isEqualState ? styles.activeSave:''}
            ${saved ? styles.saved:''}
            `}> 
           { 
           !saved ? 'save' :
              <>
                profile updated{' '}<i class="fas fa-check"></i>
              </> 
          }
          </div>
        </div>

          <div className={styles.blockBtns}>
            <label className={`${styles.block} ${styles.pic}`}>
              <i className="far fa-user"></i>
              <p>Change profile pic</p>
              <form action="/profile" method="post" enctype="multipart/form-data">
                <input onChange={(e)=>  store.dispatch(uploadImage(e, setPicSaved)) }  type="file" name="image" />
              </form>
              {
                picSaved &&
                <div className={`${styles.saved}`}>
                  profile pic updated{' '}<i className={styles.sml} class="fas fa-check"></i>
                </div> 
              }

            </label>
            <div className={`${styles.block} ${styles.project}`}>
              <i className="fas fa-plus"></i>
              <p>Add Project</p>
            </div>
            <div className={`${styles.block} ${styles.essential}`}>
              <i className="fas fa-plus"></i>
              <p>Add Essential Listening</p>
            </div>
          </div>

        <form>

          <CountryDropdown
            value={location}
            showDefaultOption={true}
            defaultOptionLabel={location?location:'My Location'}
            onChange={(e) => handleChange(e, 'location')} />


            <select name="status" value={status} onChange={(e) => handleChange(e)}>
              <option value="Music Lover" >Music Lover</option>
              <option value="Music Maker">Music Maker</option>
              <option value="Musical Prodigy" >Musical Prodigy</option>
              <option value="Guitar God" >Guitar God</option>
              <option value="Superstar DJ" >Superstar DJ</option>
              <option value="Rock Idol" >Rock Idol</option>
              <option value="Pop Idol">Pop Idol</option>
              <option value="Raver" >Raver</option>
              <option value="Dancing Queen" >Dancing Queen</option>
              <option value="Connosieur" >Connosieur</option>
              <option value="Prog Snob" >Prog Snob</option>
              <option value="Experimentor">Experimentor</option>
              <option value="Soul Man">Soul Man</option>
              <option value="Punk">Punk</option>
            </select>

            <input 
              value={genres}
              className={styles.full} 
              type="text" 
              name="genres" 
              onChange={(e) => handleChange(e)}
              placeholder={"Genres I love (sepprated by commas)"}/>

            <textarea 
              value={bio}
              name="bio" 
              onChange={(e) => handleChange(e)}
              placeholder="My bio..." />

            <h4>Social</h4>
            <div className={styles.social}> 
              <div>
                <i className="fab fa-facebook-square" /> 
                <input
                  value={facebook?facebook:''}
                  onChange={(e) => handleChange(e)}  
                  type="text" 
                  name="facebook" />
              </div>
              <div>
                <i className="fab fa-instagram"></i> 
                <input
                  value={instagram?instagram:''}
                  onChange={(e) => handleChange(e)}  
                  type="text" 
                  name="instagram" />
              </div>
              <div>
                <i className="fab fa-youtube"></i> 
                <input
                  value={youtube?youtube:''}
                  onChange={(e) => handleChange(e)}  
                  type="text" 
                  name="youtube" />
              </div>
              <div>
                <i className="fab fa-spotify"></i> 
                <input
                  value={spotify?spotify:''}
                  onChange={(e) => handleChange(e)}  
                  type="text" 
                  name="spotify" />
              </div>
              <div>
                <i className="fab fa-soundcloud"></i> 
                <input
                  value={soundcloud?soundcloud:''}
                  onChange={(e) => handleChange(e)}  
                  type="text" 
                  name="soundcloud" />
              </div>
              <div>
                <i className="fab fa-twitter-square"></i>
                 <input
                    value={twitter?twitter:''}
                    onChange={(e) => handleChange(e)}  
                    type="text"
                    name="twitter" />
                </div>
            </div >

        </form>


    </div>
  )

}

export default EditProfile;