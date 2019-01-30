import React from 'react';

class CreateMessage extends React.Component {
  state = { message: "" };

  inputHandler = (e) => {
    this.setState({ message: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.socket.emit('sendMessage', { message: this.state.message });
    this.setState({ message: "" });
  };

  render() {
    return (
      <div className="CreateMessage">
        <form onSubmit={this.submitHandler}>
          <input 
            type="text"
            onChange={this.inputHandler}
            placeholder="Enter message here..."
            value={this.state.message}
            maxLength="2048"
            required
            autoFocus
          />
        </form>
      </div>
    );
  };
}

export default CreateMessage;
