import React, { Component } from 'react';

class User extends Component {
  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( username => {
    this.props.createUser(username);
    });
  }

  signIn() {
    this.props.firebase.auth().signInWithPopup( new this.props.firebase.auth.GoogleAuthProvider() );
  }

  signOut() {
    this.props.firebase.auth().signOut();
  }

render() {
    return (
      <div id="user">
        <div id="user-name">{ this.props.username ?  this.props.username.displayName : '' }</div>
        <button className="sign-in-button" onClick={ this.props.username ? this.signOut.bind(this) : this.signIn.bind(this) }>
          <div>Sign { this.props.username ? 'out' : 'in' }</div>
        </button>
      </div>
    );
  }
}

export default User;
