import React, { Component, useState } from 'react';

import { PhotoForm } from './PhotoForm';

function AddPhoto() {
  const [formShow, setFormShow] = useState(false);

  function showForm() {
    setFormShow(true);
  }

  function hideForm() {
    setFormShow(false);
  }

  return (
    <li className="add-photo-card">
      {formShow ? (
        <PhotoForm onSubmit={hideForm} />
      ) : (
        <button onClick={showForm}>Add Photo</button>
      )}
    </li>
  );
}

class oldAddPhoto extends Component {
  state = {
    formShow: false
  };

  showForm = () => {
    this.setState({ formShow: true });
  };

  hideForm = () => {
    this.setState({ formShow: false });
  };

  render() {
    return (
      <li className="add-photo-card">
        {this.state.formShow ? (
          <PhotoForm onSubmit={this.hideForm} />
        ) : (
          <button onClick={this.showForm}>Add Photo</button>
        )}
      </li>
    );
  }
}

export { AddPhoto };
