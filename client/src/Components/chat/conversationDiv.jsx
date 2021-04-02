import React from 'react';

import styles from './conversationDiv.module.scss';

const ConversationDiv = ({ item: {user:{avatar, name, _id}}, selectedId, conversations, setSelectedConvo }) => {

  const switchCovo = (_id) => { setSelectedConvo(conversations.find(i => i.user._id === _id)) }

  return (
    <label onClick={()=>switchCovo(_id)}>
      <input type="radio" defaultChecked={selectedId===_id} name="conversation"/>
      <div className={styles.conversationDiv}>
        <img className="round-img" src={avatar} alt="avatar"/>
        <h4>{name}</h4>
      </div>
    </label>
  )

}

export default ConversationDiv;
