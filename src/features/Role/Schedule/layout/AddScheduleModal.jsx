import React, { useState } from "react";

import styled from "styled-components";
import {
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

import Button from "../../../../components/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch } from "react-redux";
import { addSchedule, getSchedule } from "../scheduleSlice";
import { useParams } from "react-router-dom";
import changeLanCategory from "../utils/changeLanCategory";
import CustomIcons from "../../../../assets/icon/customIcons";

const AddScheduleModalWrapper = styled.div``;

const EditReserveHeader = styled.div`
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

const EditReserveModalBody = styled.div`
  .form-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1.5rem 2.5rem 3.5rem 2.5rem;
    border-bottom: 0.1rem solid #e6e6e6;
    p.modal-body-text {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      font-size: 1.6rem;
      color: #8b8b8b;

      span:nth-child(1) {
        font-weight: 500;
        font-size: 1.4rem;
        color: #8b8b8b;
      }
      span:nth-child(2) {
        font-size: 1.8rem;
        font-weight: 600;
        color: black;
      }
    }
    div.dayTimeOption {
      display: flex;
      flex-direction: row;
      gap: 1rem;
      div {
        svg {
          font-size: 2rem;
        }
      }
      input.timeInput {
        width: 50%;
        height: 5.5rem;
        padding: 1rem 1.5rem;
        justify-content: center;
        align-items: center;

        border: 1px solid black;
        border-radius: 0.8rem;
        border: 1px solid #cfcfcf;

        font-size: 1.6rem !important;
        font-family: "Pretendard" !important;
        font-style: normal !important;
        font-weight: 500 !important;
        color: #8b8b8b !important;

        cursor: pointer;
      }
    }
    div.reserveOption {
      div {
        svg {
          font-size: 2rem;
        }
      }
    }
  }

  .editReserveBtn {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    padding: 2rem 2.5rem;
  }
`;

const CategoryOptions = styled.div`
  width: 100%;
  span {
    font-weight: 500;
    font-size: 1.4rem;
    color: #8b8b8b;
  }
  ul {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    margin-top: 1rem;
  }
`;

const CategoryWrap = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 7rem;
    height: 7rem;
    background-color: ${(props) => (props.selected ? "#F4F6FB" : "#FFFFFF")};
    border: 1px solid ${(props) => (props.selected ? "#3884fd" : "#dadada")};
    border-radius: 0.8rem;
    margin-bottom: 0.8rem;
    i {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 5rem;
      height: 5rem;

      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
  span {
    color: ${(props) => (props.selected ? "#3884fd" : "#dadada")};
  }
`;

const AddScheduleModal = ({
  setIsOpenModal,
  modalData,
  travelDayList,
  date,
}) => {
  const { roomId } = useParams();
  let {
    id,
    place_name,
    road_address_name,
    address_name,
    phone,
    place_url,
    x,
    y,
    mapPlaceId,
    placeName,
    placeAddress,
    lotNumberAddress,
    phoneNumber,
    latitude,
    longitude,
    link,
  } = modalData;

  if (!mapPlaceId) {
    mapPlaceId = id;
    placeName = place_name;
    lotNumberAddress = road_address_name;
    latitude = x;
    longitude = y;
    link = place_url;
  }

  const dayOption = travelDayList?.map((dayData) => {
    return {
      label: `${dayData.idx}일차`,
      date: dayData.date,
    };
  });
  const reserveOption = [
    { label: "불필요", value: false },
    { label: "필요", value: true },
  ];
  const categoryOptions = [
    {
      category: "교통",
      activeIcon: <CustomIcons.TransPortBlueIcon />,
      defaultIcon: <CustomIcons.TransPortGrayIcon />,
    },
    {
      category: "숙박",
      activeIcon: <CustomIcons.StayBlueIcon />,
      defaultIcon: <CustomIcons.StayGrayIcon />,
    },
    {
      category: "음식",
      activeIcon: <CustomIcons.FoodBlueIcon />,
      defaultIcon: <CustomIcons.FoodGrayIcon />,
    },
    {
      category: "관광",
      activeIcon: <CustomIcons.TourBlueIcon />,
      defaultIcon: <CustomIcons.TourGrayIcon />,
    },
    {
      category: "쇼핑",
      activeIcon: <CustomIcons.ShoppingBlueIcon />,
      defaultIcon: <CustomIcons.ShoppingGrayIcon />,
    },
    {
      category: "기타",
      activeIcon: <CustomIcons.EtcBlueIcon />,
      defaultIcon: <CustomIcons.EtcGrayIcon />,
    },
  ];
  const [day, setDay] = useState(null);
  const [reserve, setReserve] = useState(false);
  const [category, setCategory] = useState("교통");
  const [note, setNote] = useState("");

  // 일정추가 submit 이벤트
  const dispatch = useDispatch();
  const addScheduleData = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const time = formData.get("time");

    const categoryCon = changeLanCategory(category);

    const schedulePayload = {
      placeName: placeName,
      lotNumberAddress: lotNumberAddress,
      scheduleDate: `${day} ${time}`,
      link: link,
      isBookRequired: reserve,
      category: categoryCon,
      latitude: latitude,
      longitude: longitude,
      etc: note,
      mapPlaceId: mapPlaceId,
    };

    dispatch(addSchedule({ roomId, schedulePayload })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        if (date === day) {
          dispatch(getSchedule({ roomId, date: day }));
        }
        setIsOpenModal(false);
        return;
      }
    });
  };

  const noteMax = 30;
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "note": {
        if (value.length <= noteMax) setNote(value);
        break;
      }
      default:
        break;
    }
  };

  return (
    <AddScheduleModalWrapper>
      <EditReserveHeader>
        <dl>
          <dt>SCHEDULE</dt>
          <dd>일정 추가 및 수정</dd>
        </dl>
      </EditReserveHeader>
      <EditReserveModalBody>
        <form onSubmit={addScheduleData}>
          <div className="form-content">
            <p className="modal-body-text">
              <span>장소</span>
              <span>{placeName}</span>
            </p>
            <div className="dayTimeOption">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                name="date"
                options={dayOption}
                sx={{ width: "50%" }}
                renderInput={(params) => <TextField {...params} label="일자" />}
                onChange={(e, value) => {
                  setDay(value.date);
                }}
              />
              <input name="time" type="time" className="timeInput" />
            </div>
            <div className="reserveOption">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                name="reserve"
                options={reserveOption}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="예약여부" />
                )}
                onChange={(e, value) => {
                  setReserve(value.value);
                }}
              />
            </div>

            <CategoryOptions>
              <span>카테고리</span>
              <ul>
                {categoryOptions.map((item) => {
                  return (
                    <CategoryWrap
                      selected={category === item.category}
                      key={item.category}
                    >
                      <div onClick={() => setCategory(item.category)}>
                        <i>
                          {category === item.category
                            ? item.activeIcon
                            : item.defaultIcon}
                        </i>
                      </div>
                      <span>{item.category}</span>
                    </CategoryWrap>
                  );
                })}
              </ul>
            </CategoryOptions>

            <FormControl fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-note">
                비고를 입력하세요.
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-note"
                value={note}
                name="note"
                onChange={onChangeInput}
                endAdornment={
                  <InputAdornment position="end">
                    ({note.length}/{noteMax})
                  </InputAdornment>
                }
                label="비고를 입력하세요."
              />
              <FormHelperText id="Edit-Reserve-Note-text">
                * 최대 30자까지 입력 가능합니다.
              </FormHelperText>
            </FormControl>
          </div>
          <div className="editReserveBtn">
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
              완료
            </Button>
          </div>
        </form>
      </EditReserveModalBody>
    </AddScheduleModalWrapper>
  );
};

export default AddScheduleModal;
