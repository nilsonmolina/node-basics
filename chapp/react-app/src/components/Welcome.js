import React from 'react';
import './Welcome.css';


class Welcome extends React.Component {
  state = {
    username: "",
    input: "",
  };

  inputHandler = (e) => {
    this.setState({ input: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.setState(
      (state) => ({ username: state.input }),
      this.saveUsername
    );
  };

  saveUsername = () => {
    this.props.socket.emit('setUsername', { name: this.state.username });
    sessionStorage.setItem('username', this.state.username);
    sessionStorage.setItem('socket', this.props.socket.id);
    this.props.logIn();
  };

  render() {
    return (
      <section className="Welcome">
        <div className="modal">
          <h2>ch<span>app.</span></h2>
          <p>Welcome to my chat app... chapp!</p>
          {/* <p>To begin, type a username below.</p> */}
          <form onSubmit={this.submitHandler}>
            <input
              onChange={this.inputHandler}
              className="username"
              placeholder="Username"
              type="text"
              minLength="2"
              maxLength="25"
              required
              autoFocus
            />
          </form>
        </div>
      </section>
    );
  }
}

export default Welcome;
