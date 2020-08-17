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
  margin: 16px 0px 0px;
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

const List = styled.ul`
  list-style-type: none;
  margin: 0px;
  padding: 0px;
`;

const ListEntry = styled.li`
  padding-bottom: 12px;
  display: flex;
`;

const ListEntryLeft = styled.span`
  flex-shrink: 1;
  flex-grow: 1;
  white-space: normal;
  text-decoration: underline;
`;

const ListEntryRight = styled.span`
  padding-left: 16px;
  white-space: nowrap;
`;

const Total = styled.ul`
  list-style-type: none;
  border-top: 1px solid rgb(221, 221, 221);
  margin: 16px 0px 0px;
  padding: 24px 0px 12px;
  display: flex;
`;

const TotalLeft = styled.span`
  flex-shrink: 1;
  flex-grow: 1;
  white-space: normal;
  font-weight: 800;
`;

const TotalRight = styled.span`
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
        <List>
          <ListEntry>
            <ListEntryLeft>
              ${props.nightly_fee} x {props.totalNight} nights:
            </ListEntryLeft>
            <ListEntryRight>
              ${props.totalNightlyFee}
            </ListEntryRight>
          </ListEntry>
          <ListEntry>
            <ListEntryLeft>
              Cleaning fee:
            </ListEntryLeft>
            <ListEntryRight>
              ${props.cleaningFee}
            </ListEntryRight>
          </ListEntry>
          <ListEntry style={lastEntry}>
            <ListEntryLeft>
              Service fee:
            </ListEntryLeft>
            <ListEntryRight>
              ${props.serviceFee}
            </ListEntryRight>
          </ListEntry>
        </List>
        <Total>
          <TotalLeft>Total:</TotalLeft>
          <TotalRight>${props.totalFee}</TotalRight>
        </Total>
      </Fees>
    </div>
  );
};

export default FeeList;