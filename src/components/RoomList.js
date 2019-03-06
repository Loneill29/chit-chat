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
        <div className="row">
          <nav className="sidebar col-md-3">
            <div className="sidebar-sticky">

              <h4 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">Chat Rooms</h4>
              <form onSubmit={ (e) => { e.preventDefault(); this.createRoom(this.state.newRoom) } }>
                <input className="new-room" type="text" value={ this.state.newRoom } onChange={ (e) => { this.handleChange(e) } } name="newRoom"/>
                <input className="add-room btn btn-primary" type="submit" value="Add Room" />
              </form>


              <div className="nav-side-menu">
                  <i className="fa fa-bars fa-2x toggle-btn" title="View Available Rooms" data-toggle="collapse" data-target="#menu-content"></i>
                  <div className="menu-list">
                      <ul id="menu-content" className="menu-content collapse out">
                      {
                        this.state.rooms.map( (room, index) =>
                        <li className="nav-item" key={index}>
                          <div>
                            <button input="radio" className="btn btn-default radio-item" onClick={ () => this.props.openRoom(room.key) } >{ room.name }</button>
                            <button className="btn btn-danger delete-room" onClick={ () => this.deleteRoom(room) }><i className="far fa-trash-alt fa-sm"></i></button>
                          </div>
                        </li>
                        )
                      }
                      </ul>
              </div>
              </div>
            </div>
          </nav>
        </div>
      </section>
    );
  }
}

export default RoomList;
