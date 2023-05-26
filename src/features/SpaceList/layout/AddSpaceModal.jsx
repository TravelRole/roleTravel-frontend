import React, { useCallback, useMemo, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import Button from "../../../components/Button";
import { toast } from "react-toastify";
import { addTravel, getTravelList } from "../travelSlice";
import { useDispatch } from "react-redux";
import CalendarHeader from "./CalendarHeader";
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { formatDate } from "../../../lib/formatDate";

const AddTravelModalWrap = styled.div``;

const AddTravelModalHeader = styled.div`
  border-bottom: 0.1rem solid #e6e6e6;
  dl {
    padding: 2.2rem 2.4rem 1.8rem 2.4rem;
    dt {
      font-size: 1.6rem;
      color: #ffc759;
      font-family: "Unbounded", cursive;
      margin-bottom: 0.4rem;
      font-weight: 600;
    }
    dd {
      font-size: 2.4rem;
    }
  }
`;

const AddTravelModalBody = styled.div`
  p.modal-body-text {
    padding: 1.2rem 2.4rem 2.1rem 2.4rem;
    font-size: 1.6rem;
    color: #8b8b8b;
    font-weight: 300;
  }

  .form-content {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    padding: 0 2.5rem 2.5rem 2.5rem;
    border-bottom: 0.1rem solid #e6e6e6;
  }

  .addTravelBtns {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    padding: 2rem 2.5rem;
  }
`;

const AddSpaceModal = ({ setIsOpenModal }) => {
  const dispatch = useDispatch();
  const ROOM_NAME_MAX = 20;
  const LOCATION_MAX = 15;
  const [roomNameValue, setRoomNameValue] = useState("");
  const [locationValue, setLocationValue] = useState("");
  const [formData, setFormData] = useState({
    roomName: "",
    travelStartDate: "",
    travelEndDate: "",
    location: "",
    roomImage: Math.floor(Math.random() * (4 - 0) + 0),
  });

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

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
        travelStartDate: formatStart,
        travelEndDate: formatEnd,
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
        travelStartDate: formatStart,
        travelEndDate: formatEnd,
      }));
    }
  }, []);

  const onChangeInput = useCallback((e) => {
    const { name, value } = e.target;

    switch (name) {
      case "roomName": {
        if (value.length <= ROOM_NAME_MAX) {
          setRoomNameValue(value);
          setFormData((prev) => ({ ...prev, [name]: value }));
        }
        break;
      }
      case "location": {
        if (value.length <= LOCATION_MAX) {
          setLocationValue(value);
          setFormData((prev) => ({ ...prev, [name]: value }));
        }
        break;
      }
      default:
        break;
    }
  }, []);

  const onAddTravelSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log(formData);
      dispatch(addTravel(formData)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          setIsOpenModal(false);
          dispatch(getTravelList());
          return;
        }
      });
    },
    [dispatch, formData, setIsOpenModal]
  );

  return (
    <AddTravelModalWrap>
      <AddTravelModalHeader>
        <dl>
          <dt>NEW PLAN</dt>
          <dd>새로운 여행 계획 만들기</dd>
        </dl>
      </AddTravelModalHeader>
      <AddTravelModalBody>
        <p className="modal-body-text">
          시작할 여행의 이름, 일자, 장소를 설정해보세요!
        </p>
        <form onSubmit={onAddTravelSubmit}>
          <div className="form-content">
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="add-Travel-Name">여행이름</InputLabel>
              <OutlinedInput
                autoComplete="off"
                value={roomNameValue}
                id="add-Travel-Name"
                name="roomName"
                endAdornment={
                  <InputAdornment position="end">
                    ({roomNameValue.length}/{ROOM_NAME_MAX})
                  </InputAdornment>
                }
                label="여행이름"
                onChange={onChangeInput}
              />
              <FormHelperText id="add-Travel-Name-helper-text">
                * 최대 20자까지 입력 가능합니다.
              </FormHelperText>
            </FormControl>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="add-Travel-Date">일자</InputLabel>
              <DatePicker
                id="add-Travel-Date"
                selectsRange={true}
                selected={startDate}
                startDate={startDate}
                autoComplete="off"
                endDate={endDate}
                minDate={new Date()}
                locale="ko"
                dateFormat="yyyy/MM/dd"
                onChange={handleDateChange}
                customInput={
                  <OutlinedInput
                    id="add-Travel-Name"
                    autoComplete="off"
                    label="일자"
                    fullWidth
                  />
                }
                renderCustomHeader={({
                  date,
                  decreaseMonth,
                  increaseMonth,
                }) => (
                  <CalendarHeader
                    date={date}
                    decreaseMonth={decreaseMonth}
                    increaseMonth={increaseMonth}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="add-Travel-Location">장소</InputLabel>
              <OutlinedInput
                autoComplete="off"
                value={locationValue}
                id="add-Travel-Location"
                name="location"
                endAdornment={
                  <InputAdornment position="end">
                    ({locationValue.length}/{LOCATION_MAX})
                  </InputAdornment>
                }
                label="장소"
                onChange={onChangeInput}
              />
              <FormHelperText id="add-Travel-Location-helper-text">
                * 최대 15자까지 입력 가능합니다.
              </FormHelperText>
            </FormControl>
          </div>
          <div className="addTravelBtns">
            <Button
              className="cancelBtn"
              type="button"
              color="stroke"
              size="small"
              onClick={() => {
                setIsOpenModal(false);
              }}
            >
              취소
            </Button>
            <Button
              className="submitBtn"
              type="submit"
              color="blue"
              size="small"
            >
              생성
            </Button>
          </div>
        </form>
      </AddTravelModalBody>
    </AddTravelModalWrap>
  );
};

export default AddSpaceModal;
