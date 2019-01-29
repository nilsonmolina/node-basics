import React from 'react';
import Message from './Message';

class MessageList extends React.Component {
  state = {
    messages: [
      { message: "Yo yo yo, its ya boi.... skinny p!", name: "Alina Molina", date: this.getDate() },
      { message: "Hey guys, this is going to be a long message so that i can see what its like to have a long message on this chat... okay?", name: "Nilson", date: this.getDate() },
      { message: "Nilson... Can you be a dear... and shut up?", name: "Linh Voyo", date: this.getDate() },
      { message: "Hey lil b!", name: "Du du", date: this.getDate() },

      { message: "Yo yo yo, its ya boi.... skinny p!", name: "Alina Molina", date: this.getDate() },
      { message: "Hey guys, this is going to be a long message so that i can see what its like to have a long message on this chat... okay?", name: "Nilson", date: this.getDate() },
      { message: "Nilson... Can you be a dear... and shut up?", name: "Linh Voyo", date: this.getDate() },
      { message: "Hey lil b!", name: "Du du", date: this.getDate() },
    ],
  };

  componentDidMount() {
    const intervalId = setInterval(this.timer, 60000);
    this.setState({ intervalId });
  };
 
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  };
  
  timer = () => {
    const newMessages = this.state.messages.concat({ message: "Is anyone there?", name: "gladOS", date: this.getDate() });
    this.setState({ messages: newMessages });
  };

  getDate() {
    return new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
  };

  render() {
    return (
      <section className="MessageList">
        { this.state.messages.map((m, i) => (
          <Message key={i} message={m.message} name={m.name} date={m.date} />
        ))}
      </section>
    );
  };
}

export default MessageList;
