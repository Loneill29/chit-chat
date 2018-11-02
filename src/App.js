import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import * as firebase from 'firebase';
import  RoomList  from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';

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
  constructor(props) {
    super(props);
    this.state = {
      currentRoom: {},
      currentRoomId: 0,
      username: 0
    };
  }

  createUser(username) {
    this.setState({username: username});
  }

  openRoom(room) {
    this.setState({currentRoom: room});
  }

  render() {
    return (
      <div className="App">
        <User firebase={firebase} createUser={this.createUser.bind(this)} username={this.state.username} />
        <RoomList firebase= {firebase} currentRoom={this.state.currentRoomId} openRoom={(room) => {this.openRoom(room)} } username={this.state.username} />
        <MessageList firebase= {firebase} currentRoom={this.state.currentRoomId} username={this.state.username} />
      </div>
    );
  }
}

export default App;
