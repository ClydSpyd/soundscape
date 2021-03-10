import React from 'react';
import BrowseForums from './BrowseForums';

import styles from './Forums.module.scss';

const Forums = () => {

  return (
    <div className={`${styles.forumsContainer}`}>
      <BrowseForums />
    </div>
  )

}

export default Forums;