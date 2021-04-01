import React from 'react';

import styles from './messageDiv.module.scss';

const MessageDiv = ({myId, message:{ text, createdOn, user: { avatar, _id } }}) => {

  const isMe = myId == _id;

  return (
    <div className={`${styles.messageDiv} ${isMe && styles.isMe}`}>
      {!isMe && <img className="round-img" src={avatar} alt="avatar"/> }
      <div className={`${styles.inner} ${isMe && styles.isMe}`}>
        <p>{text}</p>
      </div>
    </div>
  )

}

export default MessageDiv;