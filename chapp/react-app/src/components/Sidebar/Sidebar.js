import React from 'react';
import UserList from './UserList';
import './Sidebar.css';


class Sidebar extends React.Component {
  state = {
    users: [],
  };

  componentDidMount() {
    if (!this.props.socket) return;
    this.props.socket.on('usersChanged', (users) => {
      this.setState({ users });
    });
  };

  render() {
    return (
      <section className="Sidebar">
        <div className="heading">
          <h2>ch<span>app.</span></h2>
          <div className="subtitle">A realtime chat application</div>
        </div>
        
        <UserList users={this.state.users} />
      </section>
    );
  }
}

export default Sidebar;
