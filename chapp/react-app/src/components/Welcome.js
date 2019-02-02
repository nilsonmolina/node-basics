import React from 'react';
import './Welcome.css';


class Welcome extends React.Component {
  state = {
    input: sessionStorage.username || '',
  };

  inputHandler = (e) => {
    this.setState({ input: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.tryLogin(this.state.input);
  };

  render() {
    return (
      <section className="Welcome">
        <div className="modal">
          <h2>ch<span>app.</span></h2>
          { this.props.state.loginErr
            ? <span className="error">{this.props.state.loginErr}</span>
            : null
          }
          <p>
            Welcome to my chat app... chapp! <br/>
            To begin, enter a username.
          </p>
          <form onSubmit={this.submitHandler}>
            <input
              onChange={this.inputHandler}
              value={this.state.input}
              className="username"
              placeholder="Username"
              type="text"
              minLength="2"
              maxLength="25"
              required
            />
          </form>
        </div>
      </section>
    );
  }
}

export default Welcome;
