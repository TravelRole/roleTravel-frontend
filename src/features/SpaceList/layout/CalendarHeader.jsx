import React from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const CalendarHeader = ({ date, decreaseMonth, increaseMonth }) => {
  const year = date.getYear() + 1900;
  const month = date.getMonth() + 1;
  return (
    <div className="header">
      <div className="header-container">
        <button type="button" onClick={decreaseMonth}>
          <HiChevronLeft />
        </button>
        <div className="date">
          {year}년 {month}월
        </div>
        <button type="button" onClick={increaseMonth}>
          <HiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader;
