import React from 'react';
import Message from './Message';

class MessageList extends React.Component {
  state = {
    messages: [],
  };

  componentDidMount() {
    if (!this.props.socket) return;
    this.props.socket.on('newMessage', (message) => {
      console.log(message);
      this.setState((state) => ({ messages: state.messages.concat(message) }));
    });
  };

  componentDidUpdate() {
    this.messageList.scrollTop = this.messageList.scrollHeight;
  }

  render() {
    return (
      <div className="MessageList" ref={e => this.messageList = e}>
        { this.state.messages.map((m, i) => (
          <Message key={i} message={m} />
        ))}
      </div>
    );
  };
}

export default MessageList;
