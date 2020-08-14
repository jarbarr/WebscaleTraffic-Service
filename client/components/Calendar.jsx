import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

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
    // get the moment object that two month before currentMomentObj
    newMomentObj = newMomentObj.subtract(2, "month");
    // update currentMomentObj in state
    this.setState({
      currentMomentObj: newMomentObj
    });
  }

  nextMonth() {
    // get a copy of the currentMomentObj
    let newMomentObj = moment(Object.assign({}, this.state.currentMomentObj));
    // get the moment object that two month after currentMomentObj
    newMomentObj = newMomentObj.add(2, "month");
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
      // OR the dateMomentObj is before or same as the checkInDateMomentObj
      // OR the dateMomentObj is before or same as the checkOutDateMomentObj
      // OR the dateMomentObj is after or same as the closestBookedDateAfterCheckInDate
      if (this.checkBookedDate(dateMomentObj) || dateMomentObj.isSameOrBefore(moment()) || dateMomentObj.isSameOrBefore(this.state.checkInDateMomentObj) || dateMomentObj.isSameOrBefore(this.state.checkOutDateMomentObj) || dateMomentObj.isSameOrAfter(this.state.closestBookedDateAfterCheckInDate)) {
        dayListInTag.push(<td key={day} style={{color:'red'}}>{day}</td>);
      } else {
        dayListInTag.push(<td key={day} style={{color:'blue'}} onClick={(e) => this.onDayClick(e, dateMomentObj)}>{day}</td>);
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
    // Wrap all week days in <th> tag
    let weekDayListInTag = weekDayList.map((day, i) =>
      <th key={i}>{day}</th>
    );

    return (
      <div className="calendar-container">
        <span>
          <div>
            <span className="prev button" onClick={(e) => this.prevMonth()}>&#60;</span>
            {" "}
            <span className="label-month">{currentMonthMomentObj.format('MMMM YYYY')}</span>
          </div>
          <table className="calendar">
            <thead>
              <tr className="calendar-header">
                {weekDayListInTag}
              </tr>
            </thead>
            <tbody>
              {this.getAllDaysOfMonth(currentMonthMomentObj)}
            </tbody>
          </table>
        </span>
        <span>
          <div>
            <span className="label-year">{nextMonthMomentObj.format('MMMM YYYY')}</span>
            {" "}
            <span className="next button" onClick={(e) => this.nextMonth()}>&#62;</span>
          </div>
          <table className="calendar">
            <thead>
              <tr className="calendar-header">
                {weekDayListInTag}
              </tr>
            </thead>
            <tbody>
              {this.getAllDaysOfMonth(nextMonthMomentObj)}
            </tbody>
          </table>
        </span>
        <button onClick={() => {this.props.clearDate(); this.clear();}}>Clear dates</button>
        <button onClick={this.props.close}>Close</button>
      </div>
    );
  }
}

export default Calendar;