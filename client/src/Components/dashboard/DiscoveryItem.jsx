import React from 'react';

import styles from './DiscoveryItem.module.scss';

const DiscoveryItem = ({item:{title, genre, likes, img, text}}) => {

  const inlineStyle = {  
    backgroundImage: "url(" + img + ")",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat'
  }

  return (
    <div className={styles.discoveryItem} style={inlineStyle}>
      <h5>{title}</h5>
      <div className={styles.details}>
        <p>{genre}</p>
        <p>{likes} likes</p>
      </div>

      <p className={styles.discoveryText}>{text}</p>

      <div className={styles.overlay} />
    </div>
  )

}

export default DiscoveryItem;