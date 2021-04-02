import React from 'react';

import styles from './conversationDiv.module.scss';

const ConversationDiv = ({ item: {user:{avatar, name, _id}}, chatId, switchCovo }) => {

  return (
    <div onClick={()=>switchCovo(_id)} className={styles.conversationDiv}>
      <img className="round-img" src={avatar} alt="avatar"/>
      <h4>{name}</h4>
    </div>
  )

}

export default ConversationDiv;
