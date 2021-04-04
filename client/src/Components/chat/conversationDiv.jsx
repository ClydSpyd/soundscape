import React from 'react';

import styles from './conversationDiv.module.scss';

const ConversationDiv = ({ item: {displayUser :{avatar, name, _id }}, key, idx, conversations, setSelectedConvo }) => {

  const switchCovo = (_id) => { setSelectedConvo(conversations.find(i => i.displayUser._id === _id)) }

  return (
    <label key={key} onClick={()=>switchCovo(_id)}>
      <input type="radio" defaultChecked={idx===0} name="conversation"/>
      <div className={styles.conversationDiv}>
        <img className="round-img" src={avatar} alt="avatar"/>
        <h4>{name}</h4>
      </div>
    </label>
  )

}

export default ConversationDiv;
