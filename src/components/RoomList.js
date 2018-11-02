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

    this.roomsRef.on('child_removed', snapshot  => {
      this.setState({ rooms: this.state.rooms.filter( room => room.key !== snapshot.key )  })
    });
  }

  createRoom(newRoom) {
    if (!this.props.username || !newRoom) { return }
      this.roomsRef.push({
        name: newRoom,
      });
    this.setState({ newRoom: '' });
  }

  deleteRoom(room) {
    this.roomsRef.child(room.key).remove();
  }

  handleChange(event) {
    this.setState({newRoom: event.target.value });
  }

  render () {
    return (
      <section>
        <h1>Chat Rooms</h1>
        <form onSubmit={ (e) => { e.preventDefault(); this.createRoom(this.state.newRoom) } }>
          <input type="text" value={ this.state.newRoom } onChange={ (e) => { this.handleChange(e) } } name="newRoom"/>
          <input type="submit" value="Add Room" />
        </form>
        <ul>
          {
            this.state.rooms.map( (room, index) =>
            <li key={index}>
              <div>
                <button onClick={ () => this.props.openRoom(room.key) } >{ room.name }</button>
                <button onClick={ () => this.deleteRoom(room) }>X</button>
              </div>
            </li>
            )
          }
        </ul>
    </section>
    );
  }
}

export default RoomList;
