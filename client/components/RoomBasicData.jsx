import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif !important;
`;

const Left = styled.div`
  margin-bottom: 24px;
`;

const Fee = styled.span`
  font-weight: 600;
  font-size: 22px;
  line-height: 26px;
`;

const Nightly = styled.span`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  white-space: nowrap;
  padding-left: 4px;
`;

const Right = styled.div`
  font-size: 14px;
  line-height: 18px;
`;

const Star = styled.span`
  font-family: Airmoji_Standalone;
  color: #FF385C;
`;

const Rating = styled.span`
  padding-left: 4px;
  font-weight: 600;
`;

const Reviews = styled.span`
  padding-left: 4px;
  color: rgb(113, 113, 113);
`;

const RoomBasicData = (props) => (
  <Container>
    <Left>
      <Fee>${props.nightly_fee}</Fee>
      <Nightly>/ night</Nightly>
    </Left>
    <Right>
      <Star>★</Star>
      <Rating>{props.rating}</Rating>
      <Reviews>({props.reviews})</Reviews>
    </Right>
  </Container>
);

export default RoomBasicData;