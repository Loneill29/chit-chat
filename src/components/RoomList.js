import React, { Component } from 'react';

class RoomList extends Component {

  constructor(props) {
    super(props);

    this.state = {
    rooms: [],
    newRoom: ''
  };

  this.roomsRef = this.props.firebase.database().ref('rooms');

  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
    const room = snapshot.val();
    room.key = snapshot.key;
    this.setState({ rooms: this.state.rooms.concat( room ) })
    });
  }

  createRoom(newRoom) {
    this.roomsRef.push({
      name: newRoom,
    });
    this.setState({ newRoom: '' });
  }

  handleChange(event) {
    this.setState({newRoom: event.target.value });
  }

render () {
  return (
    <section className="sidebar">
      <h1>Chit-Chat</h1>
      <form onSubmit={ (e) => { e.preventDefault(); this.createRoom(this.state.newRoom) } }>
        <input type="text" value={ this.state.newRoom } onChange={ (e) => { this.handleChange(e) } } name="newRoom"/>
        <input type="submit" value="New Room" />
      </form>
        <ul className="room-list">
          {
            this.state.rooms.map( (room, index) =>
            <li className="room" key={index}>
              <button onClick={ () => this.props.openRoom(room.key) } className="room-name">{ room.name }</button>
            </li>
            )
          }
        </ul>
    </section>
    );
  }
}

export default RoomList;
