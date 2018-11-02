import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

var config = {
    apiKey: "AIzaSyBRPeLHabN6YKcnuGD9N5RHgWrGg1zGCE0",
    authDomain: "chit-chat-8b537.firebaseapp.com",
    databaseURL: "https://chit-chat-8b537.firebaseio.com",
    projectId: "chit-chat-8b537",
    storageBucket: "chit-chat-8b537.appspot.com",
    messagingSenderId: "45251208663"
  };
  firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <RoomList firebase= {firebase} />
      </div>
    );
  }
}

export default App;
