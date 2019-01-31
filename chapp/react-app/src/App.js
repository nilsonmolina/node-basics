import React, { Component } from 'react';
import socketio from 'socket.io-client';
import './App.css';

import Welcome from './components/Welcome';
import Sidebar from './components/Sidebar/Sidebar';
import Messages from './components/Messages/Messages';

class App extends Component {
  state = {
    socket: false,
    loggedIn: false,
  };

  componentWillMount() {
    this.setState({ socket: socketio.connect('http://127.0.0.1:5000') });
  };

  logIn = () => {
    this.setState({ loggedIn: true });
  }

  render() {
    return (
      <div className="App">
        { !this.state.loggedIn 
          ? <Welcome socket={this.state.socket} logIn={this.logIn} />
          : (
            <React.Fragment>
              <Sidebar socket={this.state.socket} />
              <Messages socket={this.state.socket} />  
            </React.Fragment>
          )
        }
      </div>
    );
  };
}

export default App;
