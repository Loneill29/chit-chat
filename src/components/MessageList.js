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
      newMessage: "",
   };
   this.messagesRef = this.props.firebase.database().ref('messages');
  }

  updateMessages(currentRoom) {
    if (!currentRoom) { return }
    this.setState({ currentMessages: this.state.messages.filter( message => message.roomId === currentRoom ) } );
  }

  displayTime(timeStamp) {
    const newTime = timeStamp.toString().substring(0,10);
    const date = new Date(newTime * 1000);
    let time = [ date.getHours(), date.getMinutes() ];
    let AmPm = time[0] < 12 ? "AM" : "PM";
    time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
    time[0] = time[0] || 12;

    for ( let i = 1; i < 3; i++ ) {
      if ( time[i] < 10) {
        time[i] = "0" + time[i];
      }
    }
    return `${time[0]}:${time[1]} ${AmPm}`;
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) })
    });
    this.messagesRef.on('child_removed', snapshot  => {
      this.setState({ messages: this.state.messages.filter( message => message.key !== snapshot.key )  }, () => {
      this.updateMessages( this.props.currentRoom )
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const currentRoom = nextProps.currentRoom;
    this.setState({ currentMessages: this.state.messages.filter( message => message.roomId === currentRoom)});
  }

  createMessage(newMessage, currentRoom) {
    this.messagesRef.push({
      content: newMessage,
      roomId: this.props.currentRoom,
      username: this.props.username ? this.props.username.displayName : 'Guest',
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP
    },
    () => this.setState({ newMessage: "", currentMessages: this.state.messages.filter( message => message.roomId === currentRoom) }));
  }

  handleChange(event) {
    this.setState({newMessage: event.target.value });
  }

  deleteMessage(message) {
    this.messagesRef.child(message.key).remove();
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <h2>{this.props.currentRoom}</h2>
          </div>
          {this.state.currentMessages.map( (message) =>
            <div key={message.key}>
              <p>{message.username}:</p>
              <p>{message.content}</p>
              <p>{this.displayTime(message.sentAt)}</p>
              <button onClick={ () => this.deleteMessage(message) }>Delete</button>
            </div>
            )
          }
          <form onSubmit={ (e) => { e.preventDefault(); this.createMessage(this.state.newMessage, this.props.currentRoom) } }>
             <input type="text" value={ this.state.newMessage } onChange={ (e) => { this.handleChange(e) } }  name="newMessage" />
             <input id="send" type="submit" value="Send"/>
          </form>
        </div>
      </div>
    );
  }
}

export default MessageList;
