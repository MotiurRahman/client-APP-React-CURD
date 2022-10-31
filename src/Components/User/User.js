import React from "react";

const User = ({ user }) => {
  const { id, name, email } = user;
  console.log(user);
  return (
    <div>
      <ul>
        <li>ID:{id} </li>
        <li>Name:{name} </li>
        <li>email:{email} </li>
      </ul>
    </div>
  );
};

export default User;
