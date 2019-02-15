import React, { Component, createRef } from 'react';

import { UserConsumer } from '../context';

class PhotoForm extends Component {
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
