import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import styled from "styled-components";
import CalendarHeader from "../../../SpaceList/layout/CalendarHeader";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../components/Button";
import { formatDate } from "../../../../lib/formatDate";
import { toast } from "react-toastify";
import RoomEditModalRoleContent from "./RoomEditModalRoleContent";
import { useParams } from "react-router-dom";
import { editRoomInfo } from "../sidebarSlice";

const RoomEditModalWrap = styled.div``;

const RoomEditModalHeader = styled.div`
  dl {
    padding: 2.6rem 2.4rem 1.7rem 2.4rem;

    dt {
      font-size: 1.6rem;
      color: #ffc759;
      font-weight: 600;
      font-family: "Unbounded", cursive;
      margin-bottom: 0.4rem;
    }
    dd {
      font-size: 2.4rem;
    }
  }
`;

const RoomEditModalForm = styled.form`
  border-bottom: 0.1rem solid #e6e6e6;
  border-top: 0.1rem solid #e6e6e6;
  padding: 2.5rem 2.4rem 3rem 2.4rem;
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

const RoomEditModalFooter = styled.div`
  padding: 2rem 2.4rem;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 1rem;
`;

const RoomEditModal = ({ setOpenRoomEditModal }) => {
  const { roomData } = useSelector((state) => state.allPlan);
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const { roomName, location, startDate, endDate, roles } = roomData ?? {};
  const MAX_NAME = 20;
  const MAX_LOCATION = 10;
  const [roomNameValue, setRoomNameValue] = useState(roomName);
  const [locationValue, setLocationValue] = useState(location);
  const [formData, setFormData] = useState({
    roomName: roomName || "",
    location: location || "",
    startDate: startDate || "", // 기본값 설정
    endDate: endDate || "", // 기본값 설정
    roles: roles,
  });

  const [dateRange, setDateRange] = useState([
    startDate ? new Date(startDate) : null,
    endDate ? new Date(endDate) : null,
  ]);
  const [editStartDate, editEndDate] = dateRange;

  const handleDateChange = useCallback((dates) => {
    // react-datepicker에서는 range 옵션을 설정해놓으면, 처음 날짜와 마지막 날짜를 인자로 줌.
    const [start, end] = dates;
    // 선택한 기간이 8일 이상인 경우, 종료 날짜를 강제로 줄임
    if (start && end && (end - start) / (1000 * 60 * 60 * 24) >= 8) {
      const newEnd = new Date(start);
      newEnd.setDate(newEnd.getDate() + 7);
      setDateRange([start, newEnd]);
      const formatStart = formatDate(start);
      const formatEnd = formatDate(newEnd);
      setFormData((prev) => ({
        ...prev,
        startDate: formatStart,
        endDate: formatEnd,
      }));
      // 토스트를 사용해 7일까지 선택가능함을 사용자에게 알려줌.
      toast.warn("7일까지 선택 가능합니다.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    } else {
      // 만약 사용자가 8일 이상으로 날짜를 선택하지 않을 경우에는 날짜만 변환해서 데이터를 저장함.
      setDateRange(dates);
      const formatStart = formatDate(start);
      const formatEnd = formatDate(end);
      setFormData((prev) => ({
        ...prev,
        startDate: formatStart,
        endDate: formatEnd,
      }));
    }
  }, []);

  const onChangeInput = useCallback((e) => {
    const { name, value } = e.target;

    switch (name) {
      case "roomName": {
        if (value.length <= MAX_NAME) {
          setRoomNameValue(value);
          setFormData((prev) => ({ ...prev, [name]: value }));
        }
        break;
      }
      case "location": {
        if (value.length <= MAX_LOCATION) {
          setLocationValue(value);
          setFormData((prev) => ({ ...prev, [name]: value }));
        }
        break;
      }
      default: {
        break;
      }
    }
  }, []);

  const onSubmitEditRoom = useCallback(
    (e) => {
      e.preventDefault();
      const data = { roomId, formData };
      dispatch(editRoomInfo(data)).then((res) => {
        if (res.payload.status === 200) {
          setOpenRoomEditModal(false);
          window.location.reload();
        }
      });
    },
    [dispatch, formData, roomId, setOpenRoomEditModal]
  );

  return (
    <RoomEditModalWrap>
      <RoomEditModalHeader>
        <dl>
          <dt>SETTING</dt>
          <dd>여행 설정</dd>
        </dl>
      </RoomEditModalHeader>
      <RoomEditModalForm>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="edit-travel-name">여행이름</InputLabel>
          <OutlinedInput
            autoComplete="off"
            required
            id="edit-travel-name"
            name="roomName"
            label="여행이름"
            onChange={onChangeInput}
            value={roomNameValue}
            endAdornment={
              <InputAdornment position="end">
                {roomNameValue?.length}/{MAX_NAME}
              </InputAdornment>
            }
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
            selected={editStartDate}
            startDate={editStartDate}
            autoComplete="off"
            endDate={editEndDate}
            minDate={new Date()}
            locale="ko"
            dateFormat="yyyy/MM/dd"
            onChange={handleDateChange}
            customInput={
              <OutlinedInput
                id="room-edit-date-input"
                name="roomDate"
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
            required
            autoComplete="off"
            id="edit-Travel-location"
            name="location"
            label="장소"
            value={locationValue}
            onChange={onChangeInput}
            endAdornment={
              <InputAdornment position="end">
                {locationValue?.length}/{MAX_LOCATION}
              </InputAdornment>
            }
          />
          <FormHelperText id="edit-Travel-location-helper-text">
            * 최대 10자까지 입력 가능합니다.
          </FormHelperText>
        </FormControl>
        <RoomEditModalRoleWrap>
          <p>역할 정하기</p>
          <RoomEditModalRoleContainer>
            {roles?.map((role, index) => (
              <RoomEditModalRoleContent
                key={index}
                roles={role.roles}
                role={role}
                index={index}
                setFormData={setFormData}
              />
            ))}
          </RoomEditModalRoleContainer>
        </RoomEditModalRoleWrap>
      </RoomEditModalForm>
      <RoomEditModalFooter>
        <Button
          onClick={() => {
            setOpenRoomEditModal(false);
          }}
          color="stroke"
          size="x-small"
        >
          취소
        </Button>
        <Button
          type="submit"
          onClick={onSubmitEditRoom}
          color="blue"
          size="x-small"
        >
          확인
        </Button>
      </RoomEditModalFooter>
    </RoomEditModalWrap>
  );
};

export default RoomEditModal;
