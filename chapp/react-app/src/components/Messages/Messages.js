import React from 'react';
import MessageList from './MessageList';
import CreateMessage from './CreateMessage';
import './Messages.css';

const Messages = (props) => (
  <section className="Messages">
    <MessageList socket={props.socket} />
    <CreateMessage socket={props.socket} />
  </section>
);

export default Messages;
