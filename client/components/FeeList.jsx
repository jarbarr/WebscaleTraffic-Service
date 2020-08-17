import React from 'react';
import styled from 'styled-components';

const Container = styled.div`

`;

const FeeList = (props) => (
  <Container>
    <div>You won't be charged yet</div>
    <div>${props.nightly_fee} x {props.totalNight} nights: ${props.totalNightlyFee}</div>
    <div>Cleaning fee: ${props.cleaningFee}</div>
    <div>Service fee: ${props.serviceFee}</div>
    <div>Total: ${props.totalFee}</div>
  </Container>
);

export default FeeList;