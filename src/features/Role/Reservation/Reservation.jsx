import styled from "styled-components";
import axios from "axios";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  border: 5px solid aqua;
  overflow: ${(props) =>
    props.isAddModal ? "hidden hidden" : "hidden scroll"};

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

const ReserveWrapper = styled.div`
  display: grid;
  padding: 10px;
  height: 100%;
  grid-template-columns: repeat(4, 25%);
  grid-auto-rows: 300px;
  grid-gap: 2px;

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 50%);
  }
`;

const ReserveCell = styled.div`
  border: 2px solid purple;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  div {
    margin-bottom: 1rem;
  }
`;

function Reservation({ reserveList }) {
  console.log(reserveList)
  const objArray = Object.keys(reserveList).map((key) => {
    return reserveList[key].filter((item) => item.reserve === "예약필요");
  });

  const needResrveArr = objArray.map((item) => {
    return item.map((item) => {
      return (
        <ReserveCell>
          <div>
            <input type="checkbox"></input>
          </div>
          <div>{item.Day} 일차 </div>
          <div>장소(주소) : {item.placeName}</div>
          <div>시간 : {item.time}</div>
          <div>링크 : {item.WebsiteLink}</div>
          <div>비고 : {item.Extra}</div>
          <div>커멘트 :</div>
        </ReserveCell>
      );
    });
  });

  const login = async () => {
    console.log("im clicked");
    const response = await axios.post(
      "http://plactical.iptime.org:8089/auth/login",
      {
        email: "chan123@naver.com",
        password: "123422",
      },
      { withCredentials: true }
    );
    console.log(response);
  };

  const Arr = [["apple", "banana", "kiwi"], ["tiger", "rabbit"], ["sopt"]]
  const NewArr = Arr.map((item)=> item.map((item)=> <div>{item}</div>))
  console.log(NewArr)
  return (
    <>
      <Wrapper>
        <h1 style={{ fontSize: "25px", margin: "1rem", fontWeight: "bold" }}>
          예약
        </h1>
        <ReserveWrapper>
          {needResrveArr}
          <ReserveCell>
            <button type="button" onClick={login}>
              로그인버튼
            </button>
          </ReserveCell>
          
        </ReserveWrapper>
        {NewArr}
      </Wrapper>
    </>
  );
}

export default Reservation;
