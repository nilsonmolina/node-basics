import React from 'react';
import User from './User';

const UserList = (props) => (
  <section className="UserList">
    <h3>Connected Users</h3>
    {props.users.map((u) => (
      <User key={u.id} name={u.name} />
    ))}
  </section>
);

export default UserList;
