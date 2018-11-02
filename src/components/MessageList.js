import React, { Component } from 'react';
import './User.js'

class MessageList extends Component {
  constructor (props) {
    super(props);

    this.state = {
      messages: [],
      currentMessages: [],
      username: "",
      content: "",
      sentAt: "",
      newMessage: {},
      newMessageContent: ""
    };
    this.messagesRef = this.props.firebase.database().ref('messages');
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
    });
  }

  handleChange(event) {
    this.setState({newMessageContent: event.target.value });
  }

  componentWillReceiveProps(nextProps) {
    const currentRoom = nextProps.currentRoom;
    this.setState({ currentMessages: this.state.messages.filter( message => message.roomId === currentRoom)});
  }

  createMessage(newMessageContent) {
    this.messagesRef.push({
      content: this.state.newMessageContent,
      roomId: this.props.currentRoom,
      username: this.props.username.displayName,
    });
    this.setState({ newMessageContent: "", username: "", content: "",});
  }

  render() {
    return (
      <div>
        <div className="message-list">
          <div>
            <h2>{this.state.currentRoom}</h2>
          </div>
          {this.state.currentMessages.map( (message) =>
            <div key= {message.key}>
              <p className="username">{this.state.username.displayName}:</p>
              <p className="content">{message.content}</p>
              <p className="time-sent">{message.sentAt}</p>
            </div>
            )
          }
          <div>
            <form id="create-message" onSubmit={ (e) => { e.preventDefault(); this.createMessage(this.state.newMessageContent) } }>
              <input type="text" value={ this.state.newMessageContent } onChange={ (e) => { this.handleChange(e) } }  name="newMessage" />
              <input type="submit" value="Send"/>
           </form>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageList;
