import React from 'react';
import ReactPlayer from 'react-player'

import styles from './VideoPlayerModal.module.scss';
// import closeImg from '../../../Assets/Icons/icon-close--circle.svg';
import { useEffect } from 'react';

const VideoPlayerModal = ({ setShowVideo, url, height, width, closeModal }) => {

  // useEffect(() => {

  //   document.documentElement.style.overflow = 'hidden';
  //   document.body.scroll = "no";

  //   return () => {
  //     document.documentElement.style.overflow = 'scroll';
  //     document.body.scroll = "yes";

  //   }

  // }, [])

  return (
    <div className={styles.videoPlayerModal}>

      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div
            onClick={() => closeModal()}
            className={styles.closePlayer}>
            <div className="close-circle top-right" style={{top:"3px", right:"5px"}} />
          </div>
          <ReactPlayer
            controls={true}
            width={width}
            height={height}
            url={url}
          />
          <p onClick={() => closeModal()}>close</p>
        </div>
      </div>
    </div>
  )

}

export default VideoPlayerModal;