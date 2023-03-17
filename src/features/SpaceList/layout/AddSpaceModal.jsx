import React, { useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import Button from "../../../components/Button";

const AddSpaceDialog = styled.dialog`
  border: none;
  padding: 50px;
  &::backdrop {
    background: rgba(107, 114, 128, 0.75);
  }

  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 20px;
    text-align: center;
  }

  form {
    display: flex;
    gap: 10px;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    dl {
      display: flex;
      gap: 20px;
      align-items: center;
      dt {
        flex: 1;
      }
      dd {
        input {
          padding: 10px 20px;
          width: 100%;
          border: none;
          outline: none;
          border-bottom: 1px solid #ddd;
          &::placeholder {
            font-size: 1rem;
          }
        }
      }
    }
    button.submitBtn {
      margin-top: 20px;
    }
  }
`;

const AddSpaceModal = ({ modalRef }) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <AddSpaceDialog id="modal" ref={modalRef}>
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
              showIcon
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </dd>
        </dl>
        <dl>
          <dt>
            <label htmlFor="tripLocation">장소</label>
          </dt>
          <dd>
            <input
              type="text"
              id="tripLocation"
              placeholder="여행 장소를 입력해주세요."
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
    </AddSpaceDialog>
  );
};

export default AddSpaceModal;
