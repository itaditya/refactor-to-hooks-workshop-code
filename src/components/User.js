import React, { Component, useState, useEffect } from 'react';

import { UserProvider } from '../context';

function getUserPhotos(userId) {
  return JSON.parse(localStorage.getItem(userId)) || [];
}

function User({ children }) {
  const [currentUserId, setCurrentUserId] = useState(0);
  const [userPhotos, setUserPhotos] = useState([]);

  useEffect(() => {
    let userId = parseInt(localStorage.getItem('currentUserId'));

    if (!userId) {
      // If there is no userId saved in local storage

      userId = currentUserId;

      // Persist the current userId in local storage
      localStorage.setItem('currentUserId', userId);
    }

    const photos = getUserPhotos(userId);

    setCurrentUserId(userId);
    setUserPhotos(photos);

  }, []);

  function addPhoto(photoUrl) {
    setUserPhotos((oldUserPhotos) => {
      return [...oldUserPhotos, photoUrl];
    })
  }

  const setUserById = (userId) => {
    const oldUserId = currentUserId;
    const oldUserPhotos = userPhotos;

    // store photos of previous user
    const jsonPhotoData = JSON.stringify(oldUserPhotos);
    localStorage.setItem(oldUserId, jsonPhotoData);

    // set new user in local storage
    localStorage.setItem('currentUserId', userId);

    // get photos of new user from local storage
    const photos = getUserPhotos(userId);

    setCurrentUserId(userId);
    setUserPhotos(photos);
  }

  return (
    <UserProvider
      value={{
        currentUserId,
        userPhotos,
        addPhoto,
        setUserById
      }}
    >
      {children}
    </UserProvider>
  );
}

class oldUser extends Component {
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
