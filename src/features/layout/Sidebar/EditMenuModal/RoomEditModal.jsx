import {
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import styled from "styled-components";
import CalendarHeader from "../../../SpaceList/layout/CalendarHeader";
import DatePicker from "react-datepicker";

const RoomEditModalWrap = styled.div``;

const RoomEditModalHeader = styled.div`
  border-bottom: 0.1rem solid #e6e6e6;
  dl {
    padding: 2.6rem 2.4rem 1.7rem 2.4rem;

    dt {
      font-size: 1.6rem;
      color: #ffc759;
      font-family: "Unbounded", cursive;
      margin-bottom: 1.4rem;
    }
    dd {
      font-size: 2.4rem;
    }
  }
`;

const RoomEditModalForm = styled.form`
  padding: 2.5rem 2.4rem;
`;

const RoomEditModalFooter = styled.div``;

const RoomEditModal = () => {
  return (
    <RoomEditModalWrap>
      <RoomEditModalHeader>
        <dl>
          <dt>NEW PLAN</dt>
          <dd>새로운 여행 계획 만들기</dd>
        </dl>
      </RoomEditModalHeader>
      <RoomEditModalForm>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="add-Travel-Name">여행이름</InputLabel>
          <OutlinedInput
            autoComplete="off"
            id="add-Travel-Name"
            name="roomName"
            label="여행이름"
            // onChange={onChangeInput}
          />
          <FormHelperText id="add-Travel-Name-helper-text">
            * 최대 20자까지 입력 가능합니다.
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="room-edit-date">여행일자</InputLabel>
          <DatePicker
            id="room-edit-date"
            selectsRange={true}
            // selected={startDate}
            // startDate={startDate}
            autoComplete="off"
            // endDate={endDate}
            minDate={new Date()}
            locale="ko"
            dateFormat="yyyy/MM/dd"
            // onChange={handleDateChange}
            customInput={
              <OutlinedInput
                id="room-edit-date-input"
                autoComplete="off"
                label="여행일자"
                fullWidth
              />
            }
            renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
              <CalendarHeader
                date={date}
                decreaseMonth={decreaseMonth}
                increaseMonth={increaseMonth}
              />
            )}
          />
        </FormControl>
      </RoomEditModalForm>
      <RoomEditModalFooter></RoomEditModalFooter>
    </RoomEditModalWrap>
  );
};

export default RoomEditModal;
