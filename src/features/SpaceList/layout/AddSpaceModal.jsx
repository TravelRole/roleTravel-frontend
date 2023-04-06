import React, { Children, useCallback, useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import Button from "../../../components/Button";
import SearchLocationInput from "./SearchLocationInput";

const AddModalWrap = styled.div`
  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 20px;
    text-align: center;
  }

  form {
    width: 100%;
    dl {
      width: 100%;
      display: flex;
      align-items: center;
      dt {
        width: 20%;
      }
      dd {
        width: 80%;
        input {
          padding: 10px 20px;
          width: 100%;
          border: none;
          outline: none;
          border-bottom: 1px solid #ddd;
          &::placeholder {
            font-size: 1rem;
          }
          &.react-datepicker-ignore-onclickoutside {
            cursor: pointer;
            &:focus {
              color: transparent;
              text-shadow: 0 0 0 black;
              outline: none;
            }
          }
        }
      }
    }
    button.submitBtn {
      margin-top: 20px;
      float: right;
    }
  }
`;

const AddSpaceModal = ({ setIsAddModal }) => {
  const [today, setToday] = useState(new Date());
  const [tomorrow, setTomorrow] = useState(new Date(today));
  const [currentTomorrow, setCurrentTomorrow] = useState(
    tomorrow.setDate(today.getDate() + 1)
  );
  const [dateRange, setDateRange] = useState([today, currentTomorrow]);
  const [startDate, endDate] = dateRange;
  // useMemo 로 변경

  return (
    <AddModalWrap>
      <h3>새 여행 만들기</h3>
      <form action="">
        <dl>
          <dt>
            <label htmlFor="spaceName">여행 이름</label>
          </dt>
          <dd>
            <input
              type="text"
              id="spaceName"
              placeholder="여행 이름을 입력해주세요."
            />
          </dd>
        </dl>
        <dl>
          <dt>
            <label htmlFor="tripDate">여행 일자</label>
          </dt>
          <dd>
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              dateFormat="yyyy년 MM월 dd일"
              onChange={(update) => {
                setDateRange(update);
              }}
            />
          </dd>
        </dl>
        <dl>
          <dt>
            <label htmlFor="tripLocation">장소</label>
          </dt>
          {/* <dd>
            <input
              type="text"
              id="tripLocation"
              placeholder="여행 장소를 입력해주세요."
            />
          </dd> */}
          <dd>
            <SearchLocationInput />
          </dd>
        </dl>
        <dl>
          <dt>
            <label htmlFor="tripMember">총 인원 수</label>
          </dt>
          <dd>
            <input
              type="number"
              id="tripMember"
              placeholder="인원 수를 입력해주세요."
            />
          </dd>
        </dl>

        <Button
          className="submitBtn"
          type="submit"
          color="#3884fd"
          size="small"
        >
          확인
        </Button>
      </form>
    </AddModalWrap>
  );
};

export default AddSpaceModal;
