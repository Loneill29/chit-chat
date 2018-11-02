import React, { Component } from 'react';

class RoomList extends Component {

constructor(props) {
    super(props);

    this.state = {
    rooms: []
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


render () {
  return (
    <section className="sidebar">
      <h1>Chit-Chat</h1>
        <ul className="room-list">
          {
            this.state.rooms.map( (room, index) =>
            <li className="room" key={index}>
              {room.name}
            </li>
              )
            }
          </ul>
    </section>
    );
  }
}

export default RoomList;
