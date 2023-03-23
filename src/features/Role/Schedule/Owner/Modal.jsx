import React, { useState } from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import Button from "../../../../components/Button";

const SuperContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 5px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(1, 1, 1, 0.5);
`;
const AddScheduleModal = styled.div`
  position: relative;
  background: white;
  width: 500px;
  height: 400px;
`;

const AddScheduleBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  h2 {
    font-weight: bold;
    font-size: 1.2rem;
  }
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 5px;
  bottom: 5px;
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const InfoSpan = styled.div`
  overflow: scroll;
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #cdcdf4;
  }
`;

const AddSpaceModal = ({ isAddModal, setIsAddModal, modalPlace }) => {
  return (
    <>
      {isAddModal ? (
        <SuperContainer
          onClick={() => {
            console.log("why ");
            setIsAddModal(false);
          }}
        >
          <AddScheduleModal onClick={(e) => e.stopPropagation()}>
            <AddScheduleBox onClick={(e) => e.stopPropagation()}>
              <h2>일정추가하기</h2>
              <div>일정순서 : 1</div>
              <div>장소이름 : {modalPlace.name} </div>
              <div>장소주소 : {modalPlace.formatted_address}</div>
              <div>시간 : AM 10:00</div>
              <div>예약여부 : 예약필요</div>
              <div>링크 : {modalPlace.website && modalPlace.website}</div>
              <div>비고 : 오늘의 날씨</div>
            </AddScheduleBox>

            <ButtonContainer onClick={(e) => e.stopPropagation()}>
              <Button
                type="submit"
                color="#3884fd"
                size="small"
                onClick={() => setIsAddModal(false)}
              >
                취소
              </Button>
              <Button
                type="submit"
                color="#3884fd"
                size="small"
                onClick={() => console.log("im button")}
              >
                확인
              </Button>
            </ButtonContainer>
          </AddScheduleModal>
    </SuperContainer>
      ) : null}
    </>
  );
};

export default AddSpaceModal;
