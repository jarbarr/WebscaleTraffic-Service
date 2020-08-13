import React from 'react';
import styled from 'styled-components';

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
  padding-right: 36px;
  padding-top: 26px;
  padding-bottom: 10px;
  font-size: 14px;
  line-height: 18px;
`;

const DownArrow = styled.img`
  padding-right: 12px;
  right: 0px;
  top: 30%;
  position: absolute;
`;

const GuestOption = (props) => (
  <Container>
    <Guest>
      <GuestTitle>GUESTS</GuestTitle>
      <GuestNum>1 guest</GuestNum>
    </Guest>
    <Arrow>
      <DownArrow src="https://img.icons8.com/android/24/000000/expand-arrow.png"/>
    </Arrow>
  </Container>
);

export default GuestOption;