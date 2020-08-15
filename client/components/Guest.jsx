import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 24px;
  align-items: center;
  display: flex;
  width: 100%;
  color: rgb(34, 34, 34);
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-weight: 400;
`;

const Left = styled.div`
  flex: 1 1 0%;
`;

const Right = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 104px;
  height: 32px;
  color: rgb(34, 34, 34);
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
`;

const GuestType = styled.div`
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
`;

const GuestTypeInf = styled.div`
  font-size: 14px;
  line-height: 18px;
  padding-top: 4px;
`;

const GuestNum = styled.div`
  position: relative;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
`;

const GuestButton = styled.button`
  width: 32px;
  height: 32px;
  flex-grow: 0;
  flex-shrink: 0;
  cursor: pointer;
  display: inline-flex;
  text-align: center;
  color: rgb(113, 113, 113);
  font-family: inherit;
  touch-action: manipulation;
  align-items: center;
  justify-content: center;
  margin: 0px;
  padding-bottom: 4px;
  text-decoration: none;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(176, 176, 176);
  outline: none;
  background: rgb(255, 255, 255);
  border-radius: 50%;
  font-size: 22px;
`;

class Guest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    let containerStyle = {};
    let information = '';
    let number;
    if (this.props.guest === 'Adults') {
      containerStyle = {'marginTop': '8px'};
      number = this.props.adults;
    } else if (this.props.guest === 'Children') {
      containerStyle = {'marginTop': '24px'};
      information = 'Ages 2-12';
      number = this.props.children;
    } else if (this.props.guest === 'Infants') {
      containerStyle = {'marginTop': '24px'};
      information = 'Under 2';
      number = this.props.infants;
    }

    return (
      <Container style={containerStyle}>
        <Left>
          <GuestType>{this.props.guest}</GuestType>
          <GuestTypeInf>{information}</GuestTypeInf>
        </Left>
        <Right>
          <GuestButton onClick={() => this.props.subtract(this.props.guest)}>-</GuestButton>
          {number}
          <GuestButton onClick={() => this.props.add(this.props.guest)}>+</GuestButton>
        </Right>
      </Container>
    );
  }
}

export default Guest;