import React, { useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { addAnimation } from '../../helpers/addAnimation';
import useOutsideClick from '../../helpers/useOutsideClick';
import styles from './BlockNavigationContainer.module.scss'

const BlockNavigationModal = ({
  path, 
  permit, 
  cancel, 
  text:{
    warning="Are you sure you wish to leave this page?", 
    cancelText="Stay here", 
    confirmText="Proceed"
  }, 
  refs
}) => {

  const history = useHistory()
  const contRef = useRef()

  
 
  const navigate = () => {
    permit()
    setTimeout(()=>{ history.push(path) },50)
  }

  useOutsideClick([...refs, contRef], () => { //close modal if click outside
    cancel()
  })

  useEffect(()=>{

    setTimeout(()=>{
      contRef.current&&contRef.current.classList.remove(styles.shakeBlockModal)
    },1000)
  },[])
  
  useEffect(()=>{

    !contRef.current.classList.contains(styles.shakeBlockModal) && 
      addAnimation(contRef, styles.shakeBlockModal,500)

  },[path])

  return (
    <div ref={contRef} className={`${styles.blockNavigationContainer} ${styles.shakeBlockModal}`} >
        <i class="fas fa-exclamation-triangle"></i>
        <h5>{warning}</h5>
        <div className={styles.btns}>
          <h6 className="btn-blue" onClick={()=>cancel()} to={path}>{cancelText}</h6>
          <h6 className="btn-blue" onClick={navigate} to={path}>{confirmText}</h6>
        </div>
    </div>
  )

}

export default BlockNavigationModal;