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
    <DateOption minimum_stay={props.minimum_stay} booked_date={props.booked_date}/>
    <GuestOption maximum_guest={props.maximum_guest}/>
  </Container>
);

export default Options;