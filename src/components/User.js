import React, { Component } from 'react';

import { UserProvider } from '../context';

function getUserPhotos(userId) {
  return JSON.parse(localStorage.getItem(userId)) || [];
}

class User extends Component {
  state = {
    currentUserId: 0,
    userPhotos: []
  };

  componentDidMount() {
    let userId = parseInt(localStorage.getItem('currentUserId'));

    if (!userId) {
      // If there is no userId saved in local storage

      userId = this.state.currentUserId;

      // Persist the current userId in local storage
      localStorage.setItem('currentUserId', userId);
    }

    const photos = getUserPhotos(userId);

    this.setState({
      currentUserId: userId,
      userPhotos: photos
    });
  }

  addPhoto = photoUrl => {
    this.setState(prevState => ({
      userPhotos: [...prevState.userPhotos, photoUrl]
    }));
  };

  setUserById = userId => {
    const oldUserId = this.state.currentUserId;
    const oldUserPhotos = this.state.userPhotos;

    // store photos of previous user
    const jsonPhotoData = JSON.stringify(oldUserPhotos);
    localStorage.setItem(oldUserId, jsonPhotoData);

    // set new user in local storage
    localStorage.setItem('currentUserId', userId);

    // get photos of new user from local storage
    const photos = getUserPhotos(userId);

    this.setState({
      currentUserId: userId,
      userPhotos: photos
    });
  };

  render() {
    return (
      <UserProvider
        value={{
          ...this.state,
          addPhoto: this.addPhoto,
          setUserById: this.setUserById
        }}
      >
        {this.props.children}
      </UserProvider>
    );
  }
}

export { User };
