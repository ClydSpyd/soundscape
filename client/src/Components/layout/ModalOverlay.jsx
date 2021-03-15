import React, { useEffect } from 'react';

import styles from './ModalOverlay.module.scss';

const ModalOverlay = ({ Component, closeModal }) => {

  useEffect(() => {

    document.documentElement.style.overflow = 'hidden';
    document.body.scroll = "no";

    return () => {
      document.documentElement.style.overflow = 'scroll';
      document.body.scroll = "yes";

    }

  }, [])


  return (
    <div className={styles.modalOverlay}>
      <div className={styles.inner}>
        <div onClick={closeModal} className="close-circle top-right"></div>
        {Component && Component}
      </div>
    </div>
  )

}

export default ModalOverlay;