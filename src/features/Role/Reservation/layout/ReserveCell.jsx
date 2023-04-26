import React from "react";
import styled from "styled-components";
import Icons from "../../../../assets/icon/icon";

const ReserveCell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  padding: 2.4rem;
  margin-bottom: 2.1rem;
  border-radius: 1.6rem;
  background-color: white;
  box-shadow: 0px 5px 19px rgba(92, 119, 163, 0.1);
`;

const CellTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  input {
    appearance: none;
    border-radius: 50%;
    background-color: #d9d9d9;
    background-image: url("data:image/svg+xml,%3Csvg width='14' height='9' viewBox='0 0 14 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.78247 4.27374L5.4121 7.89268L12.2177 1.10718' stroke='%23F5F5F5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-size: 80% 80%;
    background-position: 50%;
    background-repeat: no-repeat;
    width: 2.1rem;
    height: 2.1rem;
    cursor: pointer;

    &:checked {
      background-color: #3884fd;
      background-image: url("data:image/svg+xml,%3Csvg width='14' height='9' viewBox='0 0 14 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.78247 4.27374L5.4121 7.89268L12.2177 1.10718' stroke='%23F5F5F5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-size: 80% 80%;
      background-position: 50%;
      background-repeat: no-repeat;
    }
  }

  label {
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;
    font-weight: 700;
    font-size: 20px;
    margin-left: 2rem;
    cursor: pointer;

    
  &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: -1rem;
        transform: translateY(-50%);
        width: 0.2rem;
        height: 1.4rem;
        background-color: #DADADA;
      }
  }


  div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 18px;
    margin-left: 2rem;
    color: #a7a7a7;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: white;
    position: absolute;
    right: 0;
    padding: 0 2.4rem 0 0; 
    cursor: pointer;

    span, svg { 
      font-size: 1.6rem;
      font-weight: 500;
      margin-right: 0.8rem;
      color: #A7A7A7;
    }
    svg{
      margin: 0;
    }
  }
`;

const CellDetail = styled.div`
  border-left: 0.2rem solid rgba(255, 199, 89, 1);
  margin: 1rem 0 1.5rem 1rem;
  padding: 1rem 0 1rem 2.4rem;
  padding-left: 2.4rem;

  ul {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    li {
      font-weight: 500;
      font-size: 1.5rem;
      color: #585858;
      span {
        margin-right: 2rem;
        font-weight: 500;
        font-size: 1.6rem;
        color: #a7a7a7;
      }
    }
    .time {
      color: #141414;
      font-weight: 600;
      font-size: 1.6rem;
    }
  }
`;

const CellReserveDetail = styled.div`
  padding-left: 1rem;
  ul {
    display: flex;
    flex-wrap: wrap;
    li {
      font-weight: 600;
      font-size: 1.5rem;
      color: #333333;
      width: 50%;

      span {
        margin-right: 2rem;
        font-weight: 500;
        font-size: 1.6rem;
        color: #3884fd;
      }
    }

    .note {
      width: 100%;
      margin-top: 1.2rem;
    }
  }
`;
// & > .placeCategory {
//   margin-left: 1.8rem;
//   padding: 0.5rem 1.5rem;
//   font-size: 1.6rem;
//   font-weight: 700;
//   color: #3884fd;
//   background: #e1edff;
//   border-radius: 99px;
// }

const ReserveCellLayout = ({ element }) => {
  // const elementObj = {
  //   Day: "1",
  //   Extra: "",
  //   WebsiteLink: "http://place.map.kakao.com/27246678",
  //   placeAddress: "서울 동작구 상도동 507-11",
  //   placeName: "스톤504 스테이크하우스",
  //   reserve: "예약필요",
  //   time: "18:02",
  // };

  return (
    <ReserveCell>
      <CellTitle>
        <input type="checkbox" id="placeName" />
        <label htmlFor="placeName">{element.placeName}</label>
        <div>숙박</div>
        <button><span>수정하기</span> <Icons.FaChevronRight /> </button>
      </CellTitle>
      <CellDetail>
        <ul>
          <li className="time">
            <span>시간</span>10:00
          </li>
          <li>
            <span>링크</span>https://www.naver.com
          </li>
          <li>
            <span>일정</span>풍경 예뻐서 선택했어요 음식맛있대요
          </li>
        </ul>
      </CellDetail>
      <CellReserveDetail>
        <ul>
          <li>
            <span>금액</span>384,900
          </li>
          <li>
            <span>결제수단</span>카드
          </li>
          <li className="note">
            <span>비고</span>가든 트윈 조식포함 예약했어요. 이렇게 더 길어질수 있어요.
          </li>
        </ul>
      </CellReserveDetail>
    </ReserveCell>
  );
};

export default ReserveCellLayout;
