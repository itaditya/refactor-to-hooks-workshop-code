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

/**
 * Naruto Wallpapers
  
    https://i.ytimg.com/vi/4jAaeL1G2vQ/maxresdefault.jpg

    https://i2.wp.com/ramenswag.com/wp-content/uploads/2016/12/naruto-wallpaper.jpg?resize=1060%2C663
    
    http://images6.fanpop.com/image/photos/37300000/Naruto-Wallpaper-stella2015-and-redwolf279-37342668-1600-1200.jpg
    
    http://s1.picswalls.com/wallpapers/2015/09/27/hd-naruto_104041723_274.jpg


  * Sasuke Wallpapers

    https://img7.androidappsapk.co/poster/8/1/2/com.andromo.dev660614.app702378_2.png

    http://images5.fanpop.com/image/photos/29200000/Sasuke-naruto-shippuuden-sasuke-lovers-29284988-500-400.jpg
*/
