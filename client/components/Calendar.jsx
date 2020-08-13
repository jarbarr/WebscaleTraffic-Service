import React from 'react';
import styled from 'styled-components';
import moment from 'moment';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentMomentObj: moment()
    };
  }

  render() {
    // get a list of week days ['Su', 'Mo', 'Tu',	'We',	'Th',	'Fr',	'Sa']
    let weekDayList = moment.weekdaysMin();
    // get a list of months ['January', 'February', 'March', 'April', ...]
    let monthList = moment.months();
    // get the current date in String
    let currentDate = this.state.currentMomentObj.format('D'); // ex. 12
    // get the current month in String
    let currentMonth = this.state.currentMomentObj.format('MMMM'); // ex. August
    // get the current year in String
    let currentYear = this.state.currentMomentObj.format('YYYY'); // ex. 2020
    // get the number of days in the current month in Number
    let numOfDaysInCurrentMonth = this.state.currentMomentObj.daysInMonth(); // ex. 31
    // get the first week day of the month in String // 0 to 6 is represent Sunday to Saturday
    let firstWeekDayOfMonth = this.state.currentMomentObj.startOf("month").format("d"); // 6

    // Wrap all week days in <td> tag (Data cells in an HTML table)
    let weekDayListInTag = weekDayList.map((day, i) =>
      <td key={i}>{day}</td>
    );
    // get a list of empty days of the month in <td> tag (if August 1 is on Saturday, Sunday to Friday are empty)
    let emptyDayListInTag = [];
    for (let i = 0; i < firstWeekDayOfMonth; i++) {
      emptyDayListInTag.push(<td className="emptySlot">{""}</td>);
    }
    // get a list of non-empty days of the month in <td> tag
    let dayListInTag = [];
    for (let i = 1; i <= numOfDaysInCurrentMonth; i++) {
      // if i is same as current day, add a class name called today.
      let className = (i == currentDate ? "day current-day" : "day");
      dayListInTag.push(<td key={i} className={className}>{i}</td>);
    }

    // set a totalSlots contains emptyDayListInTag and dayListInTag
    let totalSlotsInTag = [...emptyDayListInTag, ...dayListInTag];
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

    return (
      <div className="calendar-container">
        <table className="calendar">
          <thead>
            <tr className="calendar-header"></tr>
          </thead>
          <tbody>
            <tr>{weekDayListInTag}</tr>
            {dayInMonthInTag}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Calendar;