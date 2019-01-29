import React from 'react';
import SearchBar from './SearchBar';
import UserList from './UserList';

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
      <h2>ch<span>app.</span></h2>
        <SearchBar />
        <UserList users={this.state.users} />
      </section>
    );
  }
}

export default Sidebar;
