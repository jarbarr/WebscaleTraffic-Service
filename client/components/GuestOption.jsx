import React from 'react';
import styled from 'styled-components';
import GuestBox from './GuestBox.jsx';

const Container = styled.div`
  display: flex;
  border-top: 1px solid rgb(176, 176, 176);
`;

const Guest = styled.div`
  position: relative;
  flex: 1 1 0%;
`;

const Arrow = styled.div`
  position: relative;
  flex: 1 1 0%;
`;

const GuestTitle = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  font-size: 10px;
  font-weight: 800;
`;

const GuestNum = styled.div`
  padding-left: 12px;
  padding-top: 26px;
  padding-bottom: 10px;
  font-size: 14px;
  line-height: 18px;
`;

const DownUpArrow = styled.img`
  padding-right: 12px;
  right: 0px;
  top: 30%;
  position: absolute;
`;

class GuestOption extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: false,
      adults: 1,
      children: 0,
      infants: 0
    }
    this.add = this.add.bind(this);
    this.subtract = this.subtract.bind(this);
    this.close = this.close.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
      clicked: !this.state.clicked
    });
  }

  close() {
    this.setState({
      clicked: false
    });
  }

  checkClickStatus() {
    if (this.state.clicked) {
      return <GuestBox maximum_guest={this.props.maximum_guest} close={this.close} adults={this.state.adults} children={this.state.children} infants={this.state.infants} add={this.add} subtract={this.subtract}/>;
    } else {
      return null;
    }
  }

  subtract(guestType) {
    if (guestType === 'Adults') {
      if (this.state.adults > 1) {
        this.setState({
          adults: this.state.adults - 1
        });
      }
    } else if (guestType === 'Children') {
      if (this.state.children > 0) {
        this.setState({
          children: this.state.children - 1
        });
      }
    } else if (guestType === 'Infants') {
      if (this.state.infants > 0) {
        this.setState({
          infants: this.state.infants - 1
        });
      }
    }
  }

  add(guestType) {
    if (guestType === 'Adults') {
      if (this.state.adults + this.state.children < this.props.maximum_guest) {
        this.setState({
          adults: this.state.adults + 1
        });
      }
    } else if (guestType === 'Children') {
      if (this.state.adults + this.state.children < this.props.maximum_guest) {
        this.setState({
          children: this.state.children + 1
        });
      }
    } else if (guestType === 'Infants') {
      if (this.state.infants < 5) {
        this.setState({
          infants: this.state.infants + 1
        });
      }
    }
  }

  render() {
    let arrow;
    if (this.state.clicked) {
      arrow = <DownUpArrow style={{transform: 'rotateX(180deg)'}}  src="https://img.icons8.com/android/24/000000/expand-arrow.png"/>
    } else {
      arrow = <DownUpArrow src="https://img.icons8.com/android/24/000000/expand-arrow.png"/>
    }

    let infants = '';
    if (this.state.infants === 1) {
      infants = `, ${this.state.infants} infant`;
    } else if (this.state.infants > 1) {
      infants = `, ${this.state.infants} infants`;
    }

    let totalGuest = this.state.adults + this.state.children;
    let guest = 'guest';
    if (this.state.adults + this.state.children > 1) {
      guest = 'guests';
    }

    return (
      <Container>
          <Guest onClick={this.handleClick}>
            <GuestTitle>GUESTS</GuestTitle>
            <GuestNum>{totalGuest} {guest}{infants}</GuestNum>
          </Guest>
          <Arrow onClick={this.handleClick}>
            {arrow}
          </Arrow>
        {this.checkClickStatus()}
      </Container>
    );
  }
}

export default GuestOption;