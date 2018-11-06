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
      <section className="container-fluid">
      <h1 className="title">Chit-Chat</h1>
        <div className="row">
          <nav className="col-lg-2 d-none d-lg-block bg-light sidebar">
            <div className="sidebar-sticky">
              <h4 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">Chat Rooms</h4>
              <form onSubmit={ (e) => { e.preventDefault(); this.createRoom(this.state.newRoom) } }>
                <input className="new-room" type="text" value={ this.state.newRoom } onChange={ (e) => { this.handleChange(e) } } name="newRoom"/>
                <input className="add-room" type="submit" value="Add Room" />
              </form>
              <ul className="nav flex-column">
              {
                this.state.rooms.map( (room, index) =>
                <li className="nav-item" key={index}>
                  <div>
                    <button onClick={ () => this.props.openRoom(room.key) } >{ room.name }</button>
                    <button onClick={ () => this.deleteRoom(room) }>X</button>
                  </div>
                </li>
                )
              }
              </ul>
            </div>
          </nav>
        </div>
      </section>
    );
  }
}

export default RoomList;
