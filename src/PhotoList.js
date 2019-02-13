import React from 'react';

import { UserConsumer } from './context';

function PhotoList() {
  return (
    <UserConsumer>
      {({ userPhotos }) =>
        userPhotos.map((photo, index) => (
          <li
            className="photo"
            key={index}
            style={{ backgroundImage: 'url(' + photo + ')' }}
          />
        ))
      }
    </UserConsumer>
  );
}

export { PhotoList };
