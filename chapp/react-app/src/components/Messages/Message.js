import React from 'react';

const Message = (props) => (
  <div className={`Message ${props.message.socket === sessionStorage.socket ? "me" : "" }`}>
    <div className="bubble">
      <p>{props.message.body}</p>
      
      <div className="meta">
        <span className="name">{props.message.name}</span>
        <span className="date">{props.message.date}</span>
      </div>
    </div>
  </div>
);

export default Message;