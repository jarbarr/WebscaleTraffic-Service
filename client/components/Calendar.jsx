import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Container = styled.div`
  min-height: 355px;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-right: auto;
  padding-bottom: 36px;
`;

const Top = styled.div`
  width: 660px;
  position: relative;
  text-align: left;
  background: rgb(255, 255, 255);
`;

const Bottom = styled.div`
  position: absolute;
  left: auto;
  right: 20px;
  bottom: 3px;
`;

const WeekDaysContainer = styled.div`
  position: absolute;
  top: 62px;
  text-align: left;
  padding: 0px 8px;
`;

const WeekDays = styled.ul`
  display: block;
  list-style-type: disc;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
  padding-left: 0px;
  padding-right: 0px;
  list-style: none;
  margin: 1px 0px;
`;

const EachWeekDay = styled.li`
  width: 45px;
  display: inline-block;
  text-align: center;
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  color: rgb(113, 113, 113);
`;

const PrevButtonContainer = styled.div`
  position: absolute;
  left: 15px;
  top: 15px;
`;

const NextButtonContainer = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
`;

const PrevNextButton = styled.button`
  cursor: pointer;
  position: relative;
  border-radius: 50%;
  border-width: initial;
  border-style: none;
  outline: 0px;
  padding: 10px;
  background: transparent;
  :hover {
    background: rgb(247, 247, 247);
  }
`;

const DisablePrevButton = styled.button`
  cursor: pointer;
  position: relative;
  border-radius: 50%;
  border-width: initial;
  border-style: none;
  outline: 0px;
  padding: 10px;
  background: transparent;
  opacity: 0.5;
  cursor: not-allowed;
  color: rgb(221, 221, 221);
`;

const MonthAndDayContainer = styled.div`
  width: 660px;
  height: 361px;
  position: relative;
  overflow: hidden;
`;

const MonthAndDay = styled.div`
  width: 660px;
  position: absolute;
  display: flex;
  justify-content: space-around;
  background: transparent;
`;

const SingleCalendar = styled.div`

`;

const MonthContainer = styled.div`
text-align: center;
padding-top: 22px;
padding-bottom: 37px;
padding-left: 4px;
padding-right: 4px;
font-weight: 600;
line-height: 20px;
`;

const Month = styled.h1`
color: inherit;
font-size: 1em;
font-weight: 600;
line-height: 20px;
margin: 0px;
`;

const DaysTable = styled.table`
  border-spacing: 0px 2px;
  border-collapse: separate;
`;

const EachDayContainer = styled.td`
  text-align: center;
  padding: 0px;
  background: rgb(255, 255, 255);
  font-size: 14px;
  line-height: 18px;
`;

const EachDay = styled.div`
    margin-left: 1px;
    margin-right: 1px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: relative;
    border-radius: 100%;
    border-width: 1.5px;
    border-style: solid;
    border-color: rgb(255, 255, 255);
    height: 40px;
    width: 40px;
    color: rgb(34, 34, 34);
    font-weight: 600;
    cursor: pointer;
    :hover {
      border-color: rgb(34, 34, 34);
    }
`;

const DisableHoverEachDay = styled.div`
    margin-left: 1px;
    margin-right: 1px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: relative;
    border-radius: 100%;
    border-width: 1.5px;
    border-style: solid;
    border-color: rgb(255, 255, 255);
    height: 40px;
    width: 40px;
    color: rgb(176, 176, 176);
    font-weight: 400;
    cursor: default;
    text-decoration: line-through;
`;

const Keyboard = styled.div`
  position: absolute;
  left: 12px;
  right: auto;
  bottom: -38px;
`;

const KeyboardButton = styled.button`
  cursor: pointer;
  border-radius: 50%;
  border-style: none;
  outline: 0px;
  padding: 10px;
  background: transparent;
  :hover {
    background: rgb(247, 247, 247);
  }
`;

const ClearButton = styled.button`
  cursor: pointer;
  position: relative;
  text-align: center;
  width: auto;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 8px;
  padding-right: 8px;
  color: rgb(34, 34, 34);
  margin: 0px -8px;
  border-radius: 8px;
  outline: none;
  border-style: none;
  background: transparent;
  text-decoration: underline;
  :hover {
    color: rgb(0, 0, 0);
    background: rgb(247, 247, 247);
  }
`;

const CloseButton = styled.button`
  cursor: pointer;
  position: relative;
  text-align: center;
  width: auto;
  font-family: Circular, -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  font-size: 14px;
  line-height: 18px;
  font-weight: 600;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 16px;
  padding-right: 16px;
  color: rgb(255, 255, 255);
  border-radius: 8px;
  outline: none;
  border-style: none;
  background: rgb(34, 34, 34);
  :hover {
    background: rgb(0,0,0);
  }
`;

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMomentObj: moment(),
      checkInDateSelected: false,
      checkInDateMomentObj: null,
      checkOutDateMomentObj: null,
      closestBookedDateAfterCheckInDate: null
    };
  }

  prevMonth() {
    // get a copy of the currentMomentObj
    let newMomentObj = moment(Object.assign({}, this.state.currentMomentObj));
    // get the moment object that one month before currentMomentObj
    newMomentObj = newMomentObj.subtract(1, "month");
    // update currentMomentObj in state
    this.setState({
      currentMomentObj: newMomentObj
    });
  }

  nextMonth() {
    // get a copy of the currentMomentObj
    let newMomentObj = moment(Object.assign({}, this.state.currentMomentObj));
    // get the moment object that one month after currentMomentObj
    newMomentObj = newMomentObj.add(1, "month");
    // update currentMomentObj in state
    this.setState({
      currentMomentObj: newMomentObj
    });
  }

  getAllDaysOfMonth(currentMomentObj) {
    // get the current month in String
    let currentMonth = currentMomentObj.format('MMMM'); // ex. August
    // get the current year in String
    let currentYear = currentMomentObj.format('YYYY'); // ex. 2020
    // get the number of days in the current month in Number
    let numOfDaysInCurrentMonth = currentMomentObj.daysInMonth(); // ex. 31
    // get the first week day of the month in String // 0 to 6 is represent Sunday to Saturday
    let firstWeekDayOfMonth = currentMomentObj.startOf("month").format("d"); // 6
    // get a list of empty days of the month in <td> tag (if August 1 is on Saturday, Sunday to Friday are empty)
    let emptyDayListInTag = [];
    for (let i = 0; i < firstWeekDayOfMonth; i++) {
      emptyDayListInTag.push(<td className="emptySlot">{""}</td>);
    }
    // get a list of non-empty days of the month in <td> tag
    let dayListInTag = [];
    for (let day = 1; day <= numOfDaysInCurrentMonth; day++) {
      // get the date in 'MMMM D YYYY' format
      let date = `${currentMonth} ${day} ${currentYear}`;
      // get the moment object of the date
      let dateMomentObj = moment(date, 'MMMM D YYYY');
      // if the dateMomentObj is exist in booked_date
      // OR the dateMomentObj is before or same as the actuall TODAY MOMENT OBJECT
      // OR the dateMomentObj is before the checkInDateMomentObj
      // OR the dateMomentObj is before or same as the checkOutDateMomentObj
      // OR the dateMomentObj is after or same as the closestBookedDateAfterCheckInDate
      if (this.checkBookedDate(dateMomentObj) || dateMomentObj.isSameOrBefore(moment()) || dateMomentObj.isBefore(this.state.checkInDateMomentObj) || dateMomentObj.isSameOrBefore(this.state.checkOutDateMomentObj) || dateMomentObj.isSameOrAfter(this.state.closestBookedDateAfterCheckInDate)) {
        dayListInTag.push(<EachDayContainer key={day}><DisableHoverEachDay>{day}</DisableHoverEachDay></EachDayContainer>);
      // if the dateMomentObj is same as the checkInDateMomentObj
      } else if(dateMomentObj.isSame(this.state.checkInDateMomentObj)) {
        dayListInTag.push(<EachDayContainer key={day}><EachDay style={{color:'rgb(255, 255, 255)', background:'rgb(34, 34, 34)'}}>{day}</EachDay></EachDayContainer>);
      } else {
        dayListInTag.push(<EachDayContainer key={day} onClick={(e) => this.onDayClick(e, dateMomentObj)}><EachDay>{day}</EachDay></EachDayContainer>);
      }
    }
    // set a totalSlots contains emptyDayListInTag and dayListInTag
    let totalSlotsInTag = [...emptyDayListInTag, ...dayListInTag];
    // change all days in totalSlotsInTag into table format
    let formatedDays = this.formatAllDays(totalSlotsInTag);
    return formatedDays;
  }

  checkBookedDate(dateMomentObj) {
    let same = false;
    // iterate over the booked date
    for (let day = 0; day < this.props.booked_date.length; day++) {
      // get the moment object of the booked date
      let bookedDateMomentObj = moment(this.props.booked_date[day]);
      // if the dateMomentObj is same as the bookedDateMomentObj
      if (dateMomentObj.isSame(bookedDateMomentObj)) {
        same = true;
      }
    }
    return same;
  }

  formatAllDays(totalSlotsInTag) {
    // set a rows hold </td> while going to a new row
    let rows = [];
    // set a cells contain each </td> to assign to each row
    let cells = [];
    // get a calendar structure of a week
    totalSlotsInTag.forEach((day, i) => {
      if (i % 7 !== 0) {
        cells.push(day); // if index not equal 7 that means not go to next week
      } else {
        rows.push(cells); // when reach next week we contain all td in last week to rows
        cells = []; // empty container
        cells.push(day); // in current loop we still push current row to new container
      }
      if (i === totalSlotsInTag.length - 1) { // when end loop we add remain date
        rows.push(cells);
      }
    });
    // Wrap all rows in a </tr>
    let dayInMonthInTag = rows.map((row, i) =>
      <tr key={i}>{row}</tr>
    );
    // return formated days
    return dayInMonthInTag;
  }

  onDayClick(event, dateMomentObj) {
    // if check in date is already selected
    if (this.state.checkInDateSelected) {
      // get the check out date and pass the date to the state in App.jsx
      this.props.getCheckOutDate(dateMomentObj);
      // close the calendar pop up box
      this.props.close();
      // update the checkOutDateMomentObj in state and empty the closestBookedDateAfterCheckInDate
      this.setState({
        checkOutDateMomentObj: dateMomentObj,
        closestBookedDateAfterCheckInDate: null
      });
    } else {
      // get the check in date and pass the date to the state in App.jsx
      this.props.getCheckInDate(dateMomentObj);
      // switch checkInDateSelected to true and update the checkInDateMomentObj in state
      this.setState({
        checkInDateSelected: true,
        checkInDateMomentObj: dateMomentObj
      });
      // get the closest booked date the next to the check in date
      this.getClosestBookedDateAfterCheckInDate(dateMomentObj);
    }
  }

  getClosestBookedDateAfterCheckInDate(dateMomentObj) {
    let closestBookedDate = null;
    // if the check in date is before the first booked date in the booked_date array
    if (dateMomentObj.isBefore(moment(this.props.booked_date[0]))) {
      // closestBookedDate equal to the first booked date in the booked_date array
      closestBookedDate = moment(this.props.booked_date[0]);
    // if the check in date is after the last booked date in the booked_date array
    } else if (dateMomentObj.isAfter(moment(this.props.booked_date[this.props.booked_date.length - 1]))) {
      // closestBookedDate equal to null
      closestBookedDate = null;
    }
    // iterate over the booked date
    for (let day = 0; day < this.props.booked_date.length; day++) {
      // get the moment object of the booked date
      let bookedDateMomentObj = moment(this.props.booked_date[day]);
      // get the moment object of the next booked date
      let nextBookedDateMomentObj = moment(this.props.booked_date[day+1]);
      // if the check in date is between bookedDateMomentObj and nextBookedDateMomentObj
      if (dateMomentObj.isBetween(bookedDateMomentObj, nextBookedDateMomentObj)) {
        // closestBookedDate equal to the second booked date
        closestBookedDate = nextBookedDateMomentObj;
      }
    }
    // update the closestBookedDateAfterCheckInDate in state
    this.setState({
      closestBookedDateAfterCheckInDate: closestBookedDate
    });
  }

  clear() {
    this.setState({
      checkInDateSelected: false,
      checkInDateMomentObj: null,
      checkOutDateMomentObj: null,
      closestBookedDateAfterCheckInDate: null
    });
  }

  render() {
    // get the moment object of current month
    let currentMonthMomentObj = this.state.currentMomentObj;
    // get a copy of the moment object of current month
    let newMomentObj = moment(Object.assign({}, currentMonthMomentObj));
    // get the moment object of next month
    let nextMonthMomentObj = newMomentObj.add(1, 'month');

    // get a list of week days ['Su', 'Mo', 'Tu',	'We',	'Th',	'Fr',	'Sa']
    let weekDayList = moment.weekdaysMin();
    // Wrap all week days in <li> tag
    let weekDayListInTag = weekDayList.map((day, i) =>
      <EachWeekDay key={i}>{day}</EachWeekDay>
    );

    let leftArrow = <svg viewBox="0 0 18 18" role="presentation" style={{height:12, width:12, display:'block', fill:'currentcolor'}}><path d="m13.7 16.29a1 1 0 1 1 -1.42 1.41l-8-8a1 1 0 0 1 0-1.41l8-8a1 1 0 1 1 1.42 1.41l-7.29 7.29z" /></svg>;
    let rightArrow = <svg viewBox="0 0 18 18" role="presentation" style={{height:12, width:12, display:'block', fill:'currentcolor'}}><path d="m4.29 1.71a1 1 0 1 1 1.42-1.41l8 8a1 1 0 0 1 0 1.41l-8 8a1 1 0 1 1 -1.42-1.41l7.29-7.29z"/></svg>;

    let prevButton = <PrevNextButton onClick={(e) => this.prevMonth()}>{leftArrow}</PrevNextButton>;
    let nextButton = <PrevNextButton onClick={(e) => this.nextMonth()}>{rightArrow}</PrevNextButton>

    // if currentMonthMomentObj is equal to the actual CURRENT MONTH
    if (currentMonthMomentObj.format('MMMM YYYY') === moment().format('MMMM YYYY')) {
      // disable the prevButton
      prevButton = <DisablePrevButton>{leftArrow}</DisablePrevButton>;
    }

    let keyBoard = <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{display:'block', height:24, width:24, fill:'currentcolor'}}><path d="M29 5a2 2 0 0 1 1.995 1.85L31 7v18a2 2 0 0 1-1.85 1.995L29 27H3a2 2 0 0 1-1.995-1.85L1 25V7a2 2 0 0 1 1.85-1.995L3 5zm0 2H3v18h26zm-8 13v2H11v-2zm3-5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm16-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path></svg>

    return (
      <Container>
        <Top>
          <WeekDaysContainer style={{left: '0px'}}>
            <WeekDays>
              {weekDayListInTag}
            </WeekDays>
          </WeekDaysContainer>
          <WeekDaysContainer style={{right: '0px'}}>
            <WeekDays>
              {weekDayListInTag}
            </WeekDays>
          </WeekDaysContainer>
          <MonthAndDayContainer>
            <MonthAndDay>
              <SingleCalendar>
                <MonthContainer>
                    <Month>{currentMonthMomentObj.format('MMMM YYYY')}</Month>
                </MonthContainer>
                <DaysTable>
                  <tbody>
                    {this.getAllDaysOfMonth(currentMonthMomentObj)}
                  </tbody>
                </DaysTable>
              </SingleCalendar>
              <SingleCalendar>
                <MonthContainer>
                    <Month>{nextMonthMomentObj.format('MMMM YYYY')}</Month>
                </MonthContainer>
                <DaysTable>
                  <tbody>
                    {this.getAllDaysOfMonth(nextMonthMomentObj)}
                  </tbody>
                </DaysTable>
              </SingleCalendar>
            </MonthAndDay>
          </MonthAndDayContainer>
          <PrevButtonContainer>
            {prevButton}
          </PrevButtonContainer>
          <NextButtonContainer>
            {nextButton}
          </NextButtonContainer>
          <Keyboard>
            <KeyboardButton>
              {keyBoard}
            </KeyboardButton>
          </Keyboard>
        </Top>
        <Bottom>
          <ClearButton onClick={() => {this.props.clearDate(); this.clear();}}>Clear dates</ClearButton>
          <span style={{marginLeft: '16px'}}>
            <CloseButton onClick={this.props.close}>Close</CloseButton>
          </span>
        </Bottom>
      </Container>
    );
  }
}

export default Calendar;