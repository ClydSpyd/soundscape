import React, { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import titleCase from "../../helpers/titleCase";
import { createNewPost } from '../../actions/postActions'
import LoaderDiv from '../layout/loaderDiv'

import spinner_bars from '../../assets/loaders/spinner_bars3.svg'

import styles from './NewPostModal.module.scss';
import store from "../../store";
import { useSelector } from "react-redux";

const NewPostModal = ({ category, closeModal }) => {
  const [ postTitle, setPostTitle ] = useState('')
  const [inputHTML, setInputHTML] = useState('');
  const [ inputPlain, setInputPlain ] = useState('');
  const isIncomplete = inputPlain === '' || postTitle === '';
  const loading = useSelector(state => state.post.loading)

  useEffect(()=>{setInputPlain(inputHTML.replace(/<[^>]*>/g, ' ').trim())},[inputHTML])

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

    store.dispatch({ type: "POST_QUERY", })

    const newPostObject ={
      textPlain:inputPlain,
      textHTML:inputHTML,
      title: postTitle,
      category
    }

   store.dispatch(createNewPost(newPostObject)) 
   
  }

  useEffect(()=>{if(!loading&&!isIncomplete) closeModal()},[loading])

  return (
    <div className={styles.newPostModal}>
      <div onClick={closeModal} className="close-circle top-right"></div>
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

      {loading && <LoaderDiv propClass={styles.spinner} />}
    </div>
  )

}

export default NewPostModal;