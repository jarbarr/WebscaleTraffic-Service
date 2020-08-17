import React from 'react';
import styled from 'styled-components';
import Guest from './Guest.jsx';

const Container = styled.div`
  display: inline-block;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 6px, rgba(0, 0, 0, 0.07) 0px 0px 0px 1px;
  box-sizing: border-box;
  margin-bottom: 16px;
  margin-top: 53px;
  min-width: 280px;
  position: absolute;
  text-align: left;
  width: 86.3%;
  z-index: 2;
  background: rgb(255, 255, 255);
  border-radius: 4px;
  padding: 16px;
`;

const Sentence = styled.div`
  font-size: 14px;
  line-height: 18px;
  color: rgb(113, 113, 113);
  margin-bottom: 16px;
`;

const Last = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Close = styled.button`
    position: relative;
    font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
    font-size: 16px;
    line-height: 20px;
    font-weight: 600;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    color: rgb(34, 34, 34);
    margin: 0px -10px;
    border-style: none;
    background: transparent;
    text-decoration: underline;
`;

class GuestBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      guestList: ['Adults', 'Children', 'Infants']
    };
  }

  render() {
    return (
      <Container>
        {this.state.guestList.map((guest, i) =>
          <Guest key={i} guest={guest} maximum_guest={this.props.maximum_guest} adults={this.props.adults} children={this.props.children} infants={this.props.infants} add={this.props.add} subtract={this.props.subtract} totalGuest={this.props.totalGuest}/>
        )}
        <Sentence>{this.props.maximum_guest} guests maximum. Infants don’t count toward the number of guests.</Sentence>
        <Last>
          <Close onClick={this.props.close}>Close</Close>
        </Last>
      </Container>
    );
  }
}

export default GuestBox;