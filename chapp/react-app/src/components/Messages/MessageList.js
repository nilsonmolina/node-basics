import React from 'react';
import Message from './Message';

class MessageList extends React.Component {
  componentDidUpdate() {
    this.messageList.scrollTop = this.messageList.scrollHeight;
  }

  render() {
    return (
      <div className="MessageList" ref={e => this.messageList = e}>
        { this.props.messages.map((m, i) => (
          <Message key={i} message={m} />
        ))}
      </div>
    );
  };
}

export default MessageList;
