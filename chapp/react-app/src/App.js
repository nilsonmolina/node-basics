import React, { Component } from 'react';
import socketio from 'socket.io-client';
import './App.css';

import Sidebar from './components/Sidebar/Sidebar';
import MessageList from './components/MessageList/MessageList';

const socket = socketio.connect('http://127.0.0.1:5000');
class App extends Component {
  render() {
    return (
      <div className="App">
        <Sidebar socket={socket} />
        <MessageList socket={socket} />
      </div>
    );
  }
}

export default App;
