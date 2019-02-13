import React from 'react';

import { UserConsumer } from './context';

function UserSelect() {
  return (
    <UserConsumer>
      {({ currentUserId, setUserById }) => {
        const handleChange = event => {
          const userId = parseInt(event.target.value);
          setUserById(userId);
        };

        return (
          <select
            className="user-dropdown"
            value={currentUserId}
            onChange={handleChange}
          >
            <option value="0">Naruto</option>
            <option value="1">Sasuke</option>
          </select>
        );
      }}
    </UserConsumer>
  );
}

export { UserSelect };
