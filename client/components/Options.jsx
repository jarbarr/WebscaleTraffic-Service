import React from 'react';
import styled from 'styled-components';
import DateOption from './DateOption.jsx';
import GuestOption from './GuestOption.jsx';

const Container = styled.div`
  border-radius: 8px;
  border: 1px solid rgb(176, 176, 176);
  margin-bottom: 16px;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
`;

const Options = (props) => (
  <Container>
    <DateOption minimum_stay={props.minimum_stay} booked_date={props.booked_date} getCheckInDate={props.getCheckInDate} getCheckOutDate={props.getCheckOutDate} checkInDateMomentObj={props.checkInDateMomentObj} checkOutDateMomentObj={props.checkOutDateMomentObj} clearDate={props.clearDate}/>
    <GuestOption maximum_guest={props.maximum_guest} adults={props.adults} children={props.children} infants={props.infants} add={props.add} subtract={props.subtract}/>
  </Container>
);

export default Options;