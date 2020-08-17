import React from 'react';
import styled from 'styled-components';

const Message = styled.div`
  color: rgb(34, 34, 34);
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
  align-items: center;
  display: flex;
  flex-direction: column;
  list-style-type: none;
  text-align: center;
  margin: 8px 0px 0px;
  padding: 0px;
`;

const Fees = styled.div`
  margin-top: 24px;
  color: rgb(34, 34, 34);
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
`;

const ListContainer = styled.ul`
  list-style-type: none;
  margin: 0px;
  padding: 0px;
`;

const ListEntryContainer = styled.li`
  padding-bottom: 12px;
  display: flex;
`;

const ListEntryContainerLeft = styled.span`
  flex-shrink: 1;
  flex-grow: 1;
  white-space: normal;
  text-decoration: underline;
`;

const ListEntryContainerRight = styled.span`
  padding-left: 16px;
  white-space: nowrap;
`;

const TotalContainer = styled.ul`
  list-style-type: none;
  border-top: 1px solid rgb(221, 221, 221);
  margin: 16px 0px 0px;
  padding: 24px 0px 12px;
  display: flex;
`;

const TotalContainerLeft = styled.span`
  flex-shrink: 1;
  flex-grow: 1;
  white-space: normal;
  font-weight: 800;
`;

const TotalContainerRight = styled.span`
  padding-left: 16px;
  white-space: nowrap;
  font-weight: 800;
`;



const FeeList = (props) => {

  let lastEntry = {
    'paddingBottom': '0px'
  };

  return (
    <div>
      <Message>You won't be charged yet</Message>
      <Fees>
        <ListContainer>
          <ListEntryContainer>
            <ListEntryContainerLeft>
              ${props.nightly_fee} x {props.totalNight} nights:
            </ListEntryContainerLeft>
            <ListEntryContainerRight>
              ${props.totalNightlyFee}
            </ListEntryContainerRight>
          </ListEntryContainer>
          <ListEntryContainer>
            <ListEntryContainerLeft>
              Cleaning fee:
            </ListEntryContainerLeft>
            <ListEntryContainerRight>
              ${props.cleaningFee}
            </ListEntryContainerRight>
          </ListEntryContainer>
          <ListEntryContainer style={lastEntry}>
            <ListEntryContainerLeft>
              Service fee:
            </ListEntryContainerLeft>
            <ListEntryContainerRight>
              ${props.serviceFee}
            </ListEntryContainerRight>
          </ListEntryContainer>
        </ListContainer>
        <TotalContainer>
          <TotalContainerLeft>Total:</TotalContainerLeft>
          <TotalContainerRight>${props.totalFee}</TotalContainerRight>
        </TotalContainer>
      </Fees>
    </div>
  );
};

export default FeeList;