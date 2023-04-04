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
  console.log(reserveList);
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
    // 쿠키 이름과 값 설정
    const cookieName = "refreshToken";
    const cookieValue = response.data.refreshToken;

    // 쿠키 만료 날짜 설정
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 7 * 24 * 60 * 60 * 1000); // 현재 시간에서 7일 뒤

    // 쿠키 만들기
    document.cookie = `${cookieName}=${cookieValue}; expires=${expirationDate.toUTCString()}; path=/ ;SameSite=Lax;`;
  };

  function getCookie(cookieName) {
    const cookies = document.cookie.split(";"); // 쿠키 문자열을 ;로 구분하여 배열로 변환
    console.log(cookies);
    // for (let i = 0; i < cookies.length; i++) {
    //   const cookie = cookies[i].trim(); // 공백 제거
    //   if (cookie.startsWith(`${cookieName}=`)) {
    //     console.log( cookie.substring(`${cookieName}=`.length, cookie.length))
    //     return cookie.substring(`${cookieName}=`.length, cookie.length);
    //   }
    // }
    console.log(cookies[0]);
    if (cookies) return cookies[0];
    return null; // 쿠키를 찾지 못한 경우 null 반환
  }

  const reload = async () => {
    const myCookieValue = getCookie("refreshToken");
    // console.log(myCookieValue);
    const response = await axios.get(
      "http://plactical.iptime.org:8089/auth/test",
      {withCredentials: true}
    );
    console.log(response);
  };

  const Arr = [["apple", "banana", "kiwi"], ["tiger", "rabbit"], ["sopt"]];
  const NewArr = Arr.map((item) => item.map((item) => <div>{item}</div>));

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
            <button type="button" onClick={reload}>
              리로드
            </button>
          </ReserveCell>
        </ReserveWrapper>
        {NewArr}
      </Wrapper>
    </>
  );
}

export default Reservation;
