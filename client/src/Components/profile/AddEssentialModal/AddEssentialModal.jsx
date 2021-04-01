import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { saveProfile } from "../../../actions/profileActions";
import store from "../../../store";

import styles from './AddEssentialModal.module.scss';

const AddEssentialModal = ({ closeModal }) => {
  const [ itemParams, setItemParams ] = useState({title:'', artist:'', itemUrl:''})
  const profile = useSelector(state => state.profile.me)
  const isIncomplete = Object.values(itemParams).some(param => param === '')

  const handleInput = e => setItemParams({...itemParams, [e.target.name]:e.target.value})

  const handleSubmit = () => {
    closeModal()
    store.dispatch( saveProfile({
      ...profile,
      essentialListening:[
        ...profile.essentialListening,
        itemParams
      ]
    })
    )
  }


  return (
    <div className={styles.AddEssentialModal}>
      <div onClick={closeModal} className="close-circle top-right"></div>
      <h5 className={`lightGrey medium blockHeading`}>Essential Listening <span>Please provide a title, artist name and link to the video/audio</span></h5>

      <input 
        autoFocus 
        onChange={(e)=>handleInput(e)} 
        type="text" 
        name="title" 
        placeholder={"Title..."}/>

      <input 
        onChange={(e)=>handleInput(e)} 
        type="text" 
        name="artist" 
        placeholder={"Artist..."}/>

      <input 
        onChange={(e)=>handleInput(e)} 
        type="text" 
        name="itemUrl" 
        placeholder={"Video URL..."}/>
      


      <div className={styles.buttons}>
        <div className={`btn-purple--padding ${styles.btn} ${isIncomplete && 'disabled'}`}
          onClick={handleSubmit}>Submit</div>
      </div>

    </div>
  )

}

export default AddEssentialModal;