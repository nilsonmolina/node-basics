import React from 'react';
import MessageList from './MessageList';
import CreateMessage from './CreateMessage';
import './Messages.css';

const Messages = (props) => (
  <section className="Messages">
    <MessageList messages={props.messages} />
    <CreateMessage sendMessage={props.sendMessage} />
  </section>
);

export default Messages;
