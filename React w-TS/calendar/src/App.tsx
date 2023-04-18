import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";



var firstDay: number;
var lastDay: number;
var delayDay: string = "DATE";
const months = (month: number) => {
  switch (month) {
    case 0:
      return "JANUARY";
    case 1:
      return "FEBRUARY";
    case 2:
      return "MARCH";
    case 3:
      return "APRIL";
    case 4:
      return "MAY";
    case 5:
      return "JUNE";
    case 6:
      return "JULY";
    case 7:
      return "AUGUST";
    case 8:
      return "SEPTEMBER";
    case 9:
      return "OCTOBER";
    case 10:
      return "NOVEMBER";
    case 11:
      return "DECEMBER";
  }
};

function App() {
  var date = new Date();
  const active = new Date();

  const daysOfMonth: any = [];
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState<number>(1970);
  const [selectedDay, setSelectedDay] = useState<string>("DATE");

  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());
  var tempYear: number;

  var dy = 1;

  date = new Date(year, month, 0o1);
  tempYear = date.getFullYear();

  firstDay = date.getDay();

  date.setMonth(month + 1, 0);
  lastDay = date.getDate();
  function printDate() {
    for (let i = 0; i <= 41; i++) {
      if (i % 7 === 0) {
      }
      if (i >= firstDay && dy <= lastDay) {
        if (
          dy === active.getDate() &&
          month === active.getMonth() &&
          year === active.getFullYear()
        ) {
          daysOfMonth.push(
            <td
              style={{
                borderBottom: "1px solid #e4e8eb",
                background: "#bf822f",
                color: "white",
              }}
            >
              {dy}
            </td>
          );
        } else if (
          dy === Number(selectedDay) &&
          month === selectedMonth &&
          year === selectedYear
        ) {
          daysOfMonth.push(
            <td
              style={{
                borderBottom: "1px solid #e4e8eb",
                background: "burlywood",
                color: "white",
              }}
            >
              {dy}
            </td>
          );
        } else {
          daysOfMonth.push(
            <td style={{ borderBottom: "1px solid #e4e8eb" }}>{dy}</td>
          );
        }

        dy = dy + 1;
      } else {
        daysOfMonth.push(<td> </td>);
      }
    }
    return daysOfMonth;
  }
  function previousMonth() {
    setMonth(month - 1);
  }

  function nextMonth() {
    setMonth(month + 1);
  }

  function redirectToToday() {
    const currentDate = new Date();
    setYear(currentDate.getFullYear());
    setMonth(currentDate.getMonth());
    date = currentDate;
  }

  function yearList() {
    const totalYears: any = [];
    for (let i = 1970; i <= 2070; i++) {
      totalYears.push(<option value={i}>{i}</option>);
    }
    return totalYears;
  }
  function monthList() {
    const totalMonths: any = [];
    for (let i = 0; i <= 11; i++) {
      totalMonths.push(<option value={i}>{months(i)}</option>);
    }
    return totalMonths;
  }
  var getDaysInMonth = function (month: number, year: number) {
    return new Date(year, month + 1, 0).getDate();
  };

  function daysList() {
    const totalDays: any = [];
    for (let i = 1; i <= getDaysInMonth(selectedMonth, selectedYear); i++) {
      totalDays.push(<option value={i}>{i}</option>);
    }
    return totalDays;
  }

  function displaySelectedDate() {
    const currentDate = new Date();
    setYear(selectedYear);
    setMonth(selectedMonth);
    date = currentDate;
    setSelectedDay(delayDay);
  }

  return (
    <div className="App">
      <div className="container">
        {/* HEADING */}
        <h1 className="heading">CALENDAR</h1>
        {/* HEADING */}
        {/* TITLE BAR */}
        <div className="header">
          <div className="previous-btn next-prev-btn">
            <FontAwesomeIcon
              onClick={() => previousMonth()}
              icon={faCaretRight}
              size="2xl"
              style={{ color: "#bf822f" }}
            />
          </div>
          <h1 className="title">
            {months(date.getMonth())} - {tempYear}
          </h1>
          <div className="next-prev-btn">
            <FontAwesomeIcon
              onClick={() => nextMonth()}
              icon={faCaretRight}
              size="2xl"
              style={{ color: "#bf822f" }}
            />
          </div>
        </div>
        {/* TITLE BAR */}

        {/* MAIN CONTAINER */}
        <div className="dates">
          <div className="day">
            <p>SUN</p>
            <p>Mon</p>
            <p>TUE</p>
            <p>WED</p>
            <p>THU</p>
            <p>FRI</p>
            <p>SAT</p>
          </div>
          <div className="print-days">
            <table className="table">
              <tr className="days">{printDate()}</tr>
            </table>
          </div>
        </div>
        {/* MAIN CONTAINER */}
        {/* FOOTER */}
        <div className="btn-list">
          <button className="today-btn" onClick={() => redirectToToday()}>
            Today
          </button>
          <select
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="arrows"
          >
            {yearList()}
          </select>
          <select
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
            className="arrows"
          >
            {monthList()}
          </select>
          <select
            className="arrows"
            onChange={(e) => (delayDay = e.target.value)}
          >
            <option value="DATE">DATE</option>
            {daysList()}
          </select>
          <button className="today-btn" onClick={() => displaySelectedDate()}>
            Find Date
          </button>
        </div>
        {/* FOOTER */}
      </div>
    </div>
  );
}

export default App;
