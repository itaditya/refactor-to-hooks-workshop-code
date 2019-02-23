import React, { useContext } from 'react';

import { UserContext, UserConsumer } from '../context';

function UserSelect() {
  const userContext = useContext(UserContext);

  const handleChange = event => {
    const userId = parseInt(event.target.value);
    userContext.setUserById(userId);
  };

  return (
    <select
      className="user-dropdown"
      value={userContext.currentUserId}
      onChange={handleChange}
    >
      <option value="0">Naruto</option>
      <option value="1">Sasuke</option>
    </select>
  );
}

export { UserSelect };
