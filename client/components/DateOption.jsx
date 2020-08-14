import React from 'react';
import styled from 'styled-components';
import CalendarBox from './CalendarBox.jsx';
import moment from 'moment';

const Container = styled.div`
  display: flex;
`;

const CheckIn = styled.div`
  position: relative;
  flex: 1 1 0%;
`;

const CheckOut = styled.div`
  position: relative;
  flex: 1 1 0%;
  border-left: 1px solid rgb(176, 176, 176);
`;

const CheckTitle = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  font-size: 10px;
  font-weight: 800;
`;

const AddDate = styled.div`
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 26px;
  padding-bottom: 10px;
  font-size: 14px;
  color: rgb(113, 113, 113);
`;

class DateOption extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false
    }
  }

  handleClick() {
    this.setState({
      clicked: true
    });
  }

  close() {
    this.setState({
      clicked: false
    });
  }

  checkClickStatus() {
    if (this.state.clicked) {
      return <CalendarBox minimum_stay={this.props.minimum_stay} booked_date={this.props.booked_date} close={this.close.bind(this)} getCheckInDate={this.props.getCheckInDate} getCheckOutDate={this.props.getCheckOutDate} checkInDateMomentObj={this.props.checkInDateMomentObj} checkOutDateMomentObj={this.props.checkOutDateMomentObj} clearDate={this.props.clearDate}/>;
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        <Container onClick={this.handleClick.bind(this)}>
          <CheckIn>
            <CheckTitle>CHECK-IN</CheckTitle>
            <AddDate>{this.props.checkInDateMomentObj ? this.props.checkInDateMomentObj.format('L') : 'Add date'}</AddDate>
          </CheckIn>
          <CheckOut>
            <CheckTitle>CHECKOUT</CheckTitle>
            <AddDate>{this.props.checkOutDateMomentObj ? this.props.checkOutDateMomentObj.format('L') : 'Add date'}</AddDate>
          </CheckOut>
        </Container>
        {this.checkClickStatus()}
      </div>
    );
  }
}

export default DateOption;