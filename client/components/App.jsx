import React from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import RoomBasicData from './RoomBasicData.jsx';
import Options from './Options.jsx';

const Container = styled.div`
  max-width: 1280px;
  padding-left: 80px;
  padding-right: 80px;
  margin-right: auto;
  margin-left: auto;
`;

const Menu = styled.div`
  margin-left: 66.66666%;
  position: sticky;
  top: 80px;
  margin-top: 48px;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 12px;
  padding: 24px;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
`;

const Button = styled.button`

}
`;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allData : [],
      nightly_fee : 0,
      rating : 0,
      reviews : 0,
      minimum_stay : 0,
      maximum_guest : 0,
      booked_date : [],
      checkInDateMomentObj: null,
      checkOutDateMomentObj: null
    }
    this.getCheckInDate = this.getCheckInDate.bind(this);
    this.getCheckOutDate = this.getCheckOutDate.bind(this);
    this.clearDate = this.clearDate.bind(this);
  }

  // get all the informations and reservations of a specify room with the input room id
  getRoomData(roomID) {
    $.get(`/rooms/${roomID}/reservation`, (data) => {
      this.setState({
        allData : data,
        nightly_fee : data[0].nightly_fee,
        rating : data[0].rating,
        reviews : data[0].reviews,
        minimum_stay : data[0].minimum_stay,
        maximum_guest : data[0].maximum_guest,
        booked_date : data.map(reservation => reservation.booked_date)
      });
    });
  }

  componentDidMount(){
    // get a random room id
    let roomID = Math.floor(Math.random() * 100) + 1;
    this.getRoomData(roomID);
  }

  getCheckInDate(dateMomentObj) {
    console.log("check in: ", dateMomentObj);
    this.setState({
      checkInDateMomentObj: dateMomentObj
    });
  }

  getCheckOutDate(dateMomentObj) {
    console.log("check out: ", dateMomentObj);
    this.setState({
      checkOutDateMomentObj: dateMomentObj
    });
  }

  clearDate() {
    this.setState({
      checkInDateMomentObj: null,
      checkOutDateMomentObj: null
    });
  }

  render() {
    return(
      <Container>
        <Menu>
          <RoomBasicData nightly_fee={this.state.nightly_fee} rating={this.state.rating} reviews={this.state.reviews}/>
          <Options minimum_stay={this.state.minimum_stay} maximum_guest={this.state.maximum_guest} booked_date={this.state.booked_date} getCheckInDate={this.getCheckInDate} getCheckOutDate={this.getCheckOutDate} checkInDateMomentObj={this.state.checkInDateMomentObj} checkOutDateMomentObj={this.state.checkOutDateMomentObj} clearDate={this.clearDate}/>
          {/* <Button>Check availability</Button> */}
        </Menu>
      </Container>
    );
  }
}

export default App;

