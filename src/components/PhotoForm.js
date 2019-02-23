import React, { Component, createRef, useRef, useContext } from 'react';

import { UserContext, UserConsumer } from '../context';

function PhotoForm({ onSubmit }) {
  const inputRef = useRef();
  const userContext = useContext(UserContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    const photoUrl = inputRef.current.value;
    inputRef.current.value = '';

    userContext.addPhoto(photoUrl);

    onSubmit(event);
  };

  return (
    <UserConsumer>
      {({ addPhoto }) => (
        <form
          className="photo-form"
          onSubmit={handleSubmit}
        >
          <input
            type="url"
            placeholder="Paste Image Url"
            autoFocus
            required
            ref={inputRef}
          />
          <button type="submit">Add</button>
        </form>
      )}
    </UserConsumer>
  );
}

class oldPhotoForm extends Component {
  inputRef = createRef();

  handleSubmit = (event, addPhoto) => {
    event.preventDefault();

    const photoUrl = this.inputRef.current.value;
    this.inputRef.current.value = '';

    addPhoto(photoUrl);

    this.props.onSubmit(event);
  };

  render() {
    return (
      <UserConsumer>
        {({ addPhoto }) => (
          <form
            className="photo-form"
            onSubmit={event => this.handleSubmit(event, addPhoto)}
          >
            <input
              type="url"
              placeholder="Paste Image Url"
              autoFocus
              required
              ref={this.inputRef}
            />
            <button type="submit">Add</button>
          </form>
        )}
      </UserConsumer>
    );
  }
}

export { PhotoForm };
