import React, { Component } from 'react';

import { PhotoForm } from './PhotoForm';

class AddPhoto extends Component {
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
