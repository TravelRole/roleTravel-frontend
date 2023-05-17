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
import { useSelector } from "react-redux";
import RoleEditInput from "./RoleEditInput";
import dog from "../../../../assets/images/dog.jpeg";

const RoomEditModalWrap = styled.div``;

const RoomEditModalHeader = styled.div`
  border-bottom: 0.1rem solid #e6e6e6;
  dl {
    padding: 2.6rem 2.4rem 1.7rem 2.4rem;

    dt {
      font-size: 1.6rem;
      color: #ffc759;
      font-family: "Unbounded", cursive;
      margin-bottom: 0.4rem;
    }
    dd {
      font-size: 2.4rem;
    }
  }
`;

const RoomEditModalForm = styled.form`
  padding: 2.5rem 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-y: auto;
  max-height: 53rem;
`;

const RoomEditModalRoleWrap = styled.div`
  p {
    font-size: 1.4rem;
    color: #8b8b8b;
    margin-bottom: 1rem;
  }
`;

const RoomEditModalRoleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const RoomEditModalRoleContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;
  border: 0.1rem solid #dadada;
  border-radius: 0.8rem;
  .room-edit-users-info {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    img {
      width: 3.4rem;
      height: 3.4rem;
      border-radius: 50%;
      overflow: hidden;
    }
    dl {
      dt {
        font-size: 1.6rem;
        color: #333;
        font-weight: 400;
      }
      dd {
        font-size: 1.2rem;
        font-weight: 400;
        color: #a7a7a7;
      }
    }
  }
`;

const RoomEditModalFooter = styled.div``;

const RoomEditModal = () => {
  const { roomData } = useSelector((state) => state.allPlan);

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
          <InputLabel htmlFor="edit-travel-name">여행이름</InputLabel>
          <OutlinedInput
            autoComplete="off"
            id="edit-travel-name"
            name="roomName"
            label="여행이름"
            // onChange={onChangeInput}
          />
          <FormHelperText id="edit-travel-Name-helper-text">
            * 최대 20자까지 입력 가능합니다.
          </FormHelperText>
        </FormControl>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="room-edit-date">일자</InputLabel>
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
                label="일자"
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
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="edit-Travel-location">장소</InputLabel>
          <OutlinedInput
            autoComplete="off"
            id="edit-Travel-location"
            name="roomLocation"
            label="장소"
            // onChange={onChangeInput}
          />
          <FormHelperText id="edit-Travel-location-helper-text">
            * 최대 10자까지 입력 가능합니다.
          </FormHelperText>
        </FormControl>
        <RoomEditModalRoleWrap>
          <p>역할 정하기</p>
          <RoomEditModalRoleContainer>
            {roomData?.roles?.map((role, index) => (
              <RoomEditModalRoleContent>
                <div className="room-edit-users-info">
                  <img
                    src={role.profile === null ? dog : role.profile}
                    alt={role.name}
                  />

                  <dl>
                    <dt>{role.name}</dt>
                    <dd>{role.email}</dd>
                  </dl>
                </div>
                <RoleEditInput roles={role.roles} />
              </RoomEditModalRoleContent>
            ))}
          </RoomEditModalRoleContainer>
        </RoomEditModalRoleWrap>
      </RoomEditModalForm>
      <RoomEditModalFooter></RoomEditModalFooter>
    </RoomEditModalWrap>
  );
};

export default RoomEditModal;
