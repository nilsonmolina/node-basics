import React, { Component } from 'react';
import socketio from 'socket.io-client';
import './App.css';

import Welcome from './components/Welcome';
import Sidebar from './components/Sidebar/Sidebar';
import Messages from './components/Messages/Messages';

class App extends Component {
  static initialState = {
    socket: false,
    loggedIn: false,
    loginErr: 'Server is offline',
    username: '',
    users: [],
    messages: [],
  };
  state = App.initialState;

  componentWillMount() {
    const socket = socketio.connect('http://127.0.0.1:5000');

    socket.on('connect', () => this.setState({ 
      socket,
      loginErr: '',
    }, () => sessionStorage.socketId = this.state.socket.id ));

    // ----- LOGIN -----
    socket.on('usernameAccepted', (payload) => this.setState({
      loggedIn: true,
      username: payload.username,
      messages: payload.messages,
    }, () => sessionStorage.username = this.state.username ));

    socket.on('usersChanged', (users) => this.setState({ users }));

    // ----- MESSAGES -----    
    socket.on('messageCreated', (message) => this.setState((state) => ({ 
      messages: state.messages.concat(message),
    })));

    // ----- ERRORS -----
    socket.on('usernameTaken', (payload) => this.setState({
      loginErr: payload,
    }));

    socket.on('disconnect', () => this.setState(App.initialState));
  };

  tryLogin = (username) => {
    this.state.socket.emit('tryUsername', username);
  };

  sendMessage = (message) => {
    this.state.socket.emit('createMessage', message);
  }

  render() {
    return (
      <div className="App">
        { !this.state.loggedIn || this.state.socket.disconnected
          ? <Welcome state={this.state} tryLogin={this.tryLogin} />
          : (
            <React.Fragment>
              <Sidebar users={this.state.users} />
              <Messages messages={this.state.messages} sendMessage={this.sendMessage} />  
            </React.Fragment>
          )
        }
      </div>
    );
  };
}

export default App;
