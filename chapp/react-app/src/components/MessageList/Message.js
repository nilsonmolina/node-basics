import React from 'react';

const Message = (props) => (
  <div className={`Message ${props.name === "Nilson" ? "me" : "" }`}>
    <div className="bubble">
      <p>{props.message}</p>
      
      <div className="meta">
        <span className="name">{props.name}</span>
        <span className="date">{props.date}</span>
      </div>
    </div>
  </div>
);

export default Message;