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
    p.dayTimeOption {
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
    p.reserveOption {
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

    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      div {
        width: 7rem;
        height: 7rem;
        border: 1px solid #dadada;
        border-radius: 0.8rem;
        margin-bottom: 0.8rem;
      }
    }

    .active {
      color: #3884fd;
      border: 0.1rem solid #3884fd;
      box-shadow: 0 0.1rem 0.4rem 0.1rem #d9e6ff;
    }
  }
`;

const dayOption = [
  { label: "1일차", day: 1 },
  { label: "2일차", day: 2 },
  { label: "3일차", day: 3 },
  { label: "4일차", day: 4 },
];

const reserveOption = ["예약필요", "예약완료"];

const categoryOptions = ["교통", "숙박", "음식", "관광", "쇼핑", "기타"];

const AddScheduleModal = ({ setIsOpenModal }) => {
  const [category, setCategory] = useState("traffic");
  const [note, setNote] = useState("");
  const [fee, setFee] = useState("");

  const noteMax = 30;

  const onChangeInput = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "fee": {
        const inputfeeValue = value;
        const parts = inputfeeValue.split(",");
        const newFeeValue = isNaN(parseInt(parts.join(""), 10))
          ? ""
          : parseInt(parts.join(""), 10);
        setFee(newFeeValue);
        break;
      }
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
        <form>
          <div className="form-content">
            <p className="modal-body-text">
              <span>장소</span>
              <span>장소 이름 텍스트가 들어갑니다.</span>
            </p>
            <p className="dayTimeOption">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={dayOption}
                sx={{ width: "50%" }}
                renderInput={(params) => <TextField {...params} label="일자" />}
              />
              <input type="time" className="timeInput" />
            </p>
            <p className="reserveOption">
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={reserveOption}
                sx={{ width: "100%" }}
                renderInput={(params) => (
                  <TextField {...params} label="예약여부" />
                )}
              />
            </p>

            <CategoryOptions>
              <span>카테고리</span>
              <ul>
                {categoryOptions.map((item) => {
                  return (
                    <li>
                      <div></div>
                      <span>{item}</span>
                    </li>
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
