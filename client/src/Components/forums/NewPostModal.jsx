import React, { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import titleCase from "../../helpers/titleCase";
import { createNewPost } from '../../actions/postActions'

import styles from './NewPostModal.module.scss';
import store from "../../store";

const NewPostModal = ({category}) => {
  const [ postTitle, setPostTitle ] = useState('')
  const [inputHTML, setInputHTML] = useState('');
  const [ inputPlain, setInputPlain ] = useState('');
  const isIncomplete = inputPlain === '' || postTitle === '';

  useEffect(()=>{setInputPlain(inputHTML.replace(/<[^>]*>/g, ''))},[inputHTML])

  const editorModules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'align': [] }],
      [{ 'color': [] }, { 'background': [] }]
    ]
  };

  const handleSubmit = () => {

    const newPostObject ={
      textPlain:inputPlain,
      textHTML:inputHTML,
      title: postTitle,
      category
    }

   store.dispatch(createNewPost(newPostObject)) 
   
  }

  return (
    <div className={styles.newPostModal}>
      <h5>New Post in <span>{titleCase(category)}</span></h5>
      <input 
        autoFocus 
        onChange={(e)=>setPostTitle(e.target.value)} 
        type="text" 
        name="postTitle" 
        placeholder={"Post title..."}/>
        
      <ReactQuill 
        modules={editorModules}
        theme="snow" 
        value={inputHTML} 
        onChange={setInputHTML}>
      </ReactQuill>
      <div className={styles.buttons}>
        <div className={`btn-purple--padding ${styles.btn} ${isIncomplete && 'disabled'}`}
          onClick={handleSubmit}>Submit</div>
      </div>
    </div>
  )

}

export default NewPostModal;