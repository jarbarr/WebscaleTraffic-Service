import React from 'react';
import $ from 'jquery';
import moment from 'moment';
import styled from 'styled-components';
import RoomBasicData from './RoomBasicData.jsx';
import Options from './Options.jsx';
import FeeList from './FeeList.jsx';

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
  cursor: pointer;
  display: inline-block;
  position: relative;
  text-align: center;
  touch-action: manipulation;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  padding-top: 14px;
  padding-bottom: 14px;
  padding-left: 24px;
  padding-right: 24px;
  color: rgb(255, 255, 255);
  width: 100%;
  margin: 0px;
  text-decoration: none;
  border-radius: 8px;
  outline: none;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  background: linear-gradient(to right, rgb(230, 30, 77) 0%, rgb(227, 28, 95) 50%, rgb(215, 4, 102) 100%);
`;

const ButtonWord = styled.span`
  display: block !important;
  position: relative !important;
  pointer-events: none !important;
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
      checkOutDateMomentObj: null,
      mouseX: 0,
      mouseY: 0,
      hover: false
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

  getTotalNight(checkInDateMomentObj, checkOutDateMomentObj) {
    // get a copy of the checkInDateMomentObj
    let newCheckInDateMomentObj = moment(Object.assign({}, checkInDateMomentObj));
    let count = 0;
    while(newCheckInDateMomentObj.isBefore(checkOutDateMomentObj)) {
      count++;
      // add one day to the newCheckInDateMomentObj
      newCheckInDateMomentObj = newCheckInDateMomentObj.add(1, 'days');
    }
    return count;
  }

  toggleHover() {
    this.setState({
      hover: !this.state.hover
    });
  }

  handleMouseMove(event) {
    this.setState({
      mouseX: Math.round(event.pageX / $(window).width() * 100),
      mouseY: Math.round(event.pageY / $(window).width() * 100)
    });
    console.log(this.state.mouseX, this.state.mouseY);
  }

  render() {
    let totalNight = null;
    let totalNightlyFee = null;
    let cleaningFee = null;
    let serviceFee = null;
    let totalFee = null;
    let feeList = null;
    let submitButton = <Button style={buttonStyle} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)} onMouseMove={this.handleMouseMove.bind(this)}><ButtonWord>Check availability</ButtonWord></Button>;
    // if check in date and check out date is already selected
    if (this.state.checkInDateMomentObj && this.state.checkOutDateMomentObj) {
      // use the check in date and check out date to find the total nights
      totalNight = this.getTotalNight(this.state.checkInDateMomentObj, this.state.checkOutDateMomentObj);
      // use the total nights times the nightly fee to find the total nightly fee
      totalNightlyFee = totalNight * this.state.nightly_fee;
      // use the nightly fee to find the cleaning fee (between 45% and 85% (exclusive) of nightly fee)
      cleaningFee = Number((this.state.nightly_fee * (Math.random() * (0.85 - 0.45) + 0.45)).toFixed(0));
      // use the total nightly fee and the cleaning fee to find the service fee ((Total nightly fee + cleaning fee) * 0.142)
      serviceFee = Number(((totalNightlyFee + cleaningFee) * 0.142).toFixed(0));
      // get the total fee
      totalFee = totalNightlyFee + cleaningFee + serviceFee;
      // update feeList
      feeList = <FeeList nightly_fee={this.state.nightly_fee} totalNight={totalNight} totalNightlyFee={totalNightlyFee} cleaningFee={cleaningFee} serviceFee={serviceFee} totalFee={totalFee}/>
      // update submit button
      submitButton = <Button style={buttonStyle} onMouseEnter={this.toggleHover.bind(this)} onMouseLeave={this.toggleHover.bind(this)} onMouseMove={this.handleMouseMove.bind(this)}><ButtonWord>Reserve</ButtonWord></Button>;
    }

    let buttonStyle = {};
    if (this.state.hover) {
      buttonStyle = {
        'background': `radial-gradient(circle at ${this.state.mouseX}% ${this.state.mouseY}%, #FF385C 0%, #E61E4D 27.5%, #E31C5F 40%, #D70466 57.5%, #BD1E59 75%, #BD1E59 100%)`,
      };
    }

    return(
      <Container>
        <Menu>
          <RoomBasicData nightly_fee={this.state.nightly_fee} rating={this.state.rating} reviews={this.state.reviews}/>
          <Options minimum_stay={this.state.minimum_stay} maximum_guest={this.state.maximum_guest} booked_date={this.state.booked_date} getCheckInDate={this.getCheckInDate} getCheckOutDate={this.getCheckOutDate} checkInDateMomentObj={this.state.checkInDateMomentObj} checkOutDateMomentObj={this.state.checkOutDateMomentObj} clearDate={this.clearDate}/>
          {submitButton}
          {feeList}
        </Menu>
      </Container>
    )
  }
}

export default App;

