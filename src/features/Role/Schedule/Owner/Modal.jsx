import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../../../components/Button";

const SuperContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 5px solid red;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(1, 1, 1, 0.5);
  z-index: 10;
`;
const AddScheduleModal = styled.div`
  position: relative;
  background: white;
  width: 500px;
  height: 400px;
`;

const AddScheduleBox = styled.form`
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

const AddSpaceModal = ({
  isAddModal,
  setIsAddModal,
  modalPlace,
  AddScheduleList,
}) => {
  const AddSchedule = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);

    const Day = formdata.get("Day");
    const time = formdata.get("time");
    const placeName = formdata.get("placeName");
    const placeAddress = formdata.get("placeAddress");
    const reserve = formdata.get("reserve");
    const WebsiteLink = formdata.get("WebsiteLink");
    const Extra = formdata.get("Extra");
    if (time === "") return alert("시간을 지정해주세요");
    const ScheduleObj = {
      Day,
      time,
      placeName,
      placeAddress,
      reserve,
      WebsiteLink,
      Extra,
    };
    AddScheduleList(ScheduleObj);
    setIsAddModal(false);
  };

  console.log(modalPlace)


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
            <AddScheduleBox onSubmit={AddSchedule}>
              <h2>일정추가하기</h2>
              <div>
                일정일차 :{" "}
                <select name="Day">
                  <option value="1">1일차</option>
                  <option value="2">2일차</option>
                  <option value="3">3일차</option>
                </select>
              </div>
              <div>
                시간 : <input type="time" name="time" />
              </div>
              <div>
                장소 :{" "}
                <input
                  type="text"
                  name="placeName"
                  value={modalPlace.place_name}
                  readonly
                ></input>{" "}
              </div>
              <div>
                장소주소 :{" "}
                <input
                  type="text"
                  name="placeAddress"
                  value={modalPlace.address_name}
                  readonly
                  style={{width:"70%"}}
                ></input>
              </div>

              <div>
                예약여부 :{" "}
                <select name="reserve">
                  <option value="예약불필요">예약불필요</option>
                  <option value="예약필요">예약필요</option>
                  <option value="예약완료">예약완료</option>
                </select>
              </div>
              <div>
                링크 :{" "}
                <input
                  type="text"
                  name="WebsiteLink"
                  value={modalPlace.place_url && modalPlace.place_url}
                  readonly
                ></input>
              </div>
              <div>
                비고 :{" "}
                <input
                  type="text"
                  name="Extra"
                  style={{ width: "300px" }}
                ></input>
              </div>
              <ButtonContainer onClick={(e) => e.stopPropagation()}>
                <Button
                  type="button"
                  color="#3884fd"
                  size="small"
                  onClick={() => setIsAddModal(false)}
                >
                  취소
                </Button>
                <Button type="submit" color="#3884fd" size="small">
                  확인
                </Button>
              </ButtonContainer>
            </AddScheduleBox>
          </AddScheduleModal>
        </SuperContainer>
      ) : null}
    </>
  );
};

export default AddSpaceModal;
