import React from "react";
import styled from "styled-components";
import Icons from "../../../../assets/icon/icon";

const ReserveCell = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  position: relative;
  padding: 2.5rem;
  margin-bottom: 2.1rem;
  border-radius: 1.6rem;
  background-color: white;
  box-shadow: 0px 5px 19px rgba(92, 119, 163, 0.1);
  .checkBoxContainer {
    margin-right: 1rem;
  }
  .ReserveDetail {
    display: flex;
    flex-direction: column;

    a {
        margin-left: 0.5rem;
      font-size: 1.8rem;
      text-decoration: none;
    }

    & > .place_Name {
      display: flex;
      flex-direction: row;
      margin-bottom: 2.5rem;
      color: #333333;
      font-weight: 700 !important;
      font-size: 1.8rem;
      & > .placeCategory {
        margin-left: 1.8rem;
        padding: 0.5rem 1.5rem;
        font-size: 1.6rem;
        font-weight: 700;
        color: #3884fd;
        background: #e1edff;
        border-radius: 99px;
      }
    }

    & > .bottomMarginSpan {
      margin-bottom: 2.5rem;
    }
    & > span {
      color: #8b8b8b;
      font-weight: 500 !important;
      font-size: 1.8rem;
    }
  }
  .EditBtnContainer {
    display: flex;
    align-items: flex-end;
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 0 1.2rem 2.5rem 0;

    & > button {
      display: flex;
      flex-direction: row;
      padding: 0.8rem 2rem;
      border: none;
      background: #3884fd;
      border-radius: 8px;
      color: white;

      & > svg {
        margin-right: 0.5rem;
      }
    }
  }
`;

const ReserveCellLayout = (element) => {
  return (
    <ReserveCell>
      <div className="checkBoxContainer">
        <input type="checkbox"></input>
      </div>
      <div className="ReserveDetail">
        <span className="place_Name">
          {element.placeName} <div className="placeCategory">숙박</div>
        </span>
        <span>시간 : {element.time}</span>
        <span>
          링크 :
          <a href={element.WebsiteLink} target="_blank" rel="noreferrer">
            {element.WebsiteLink}
          </a>
        </span>
        <span className="bottomMarginSpan">일정비고 : 없음</span>
        <span>금액 : 수정버튼을 눌러 작성해주세요.</span>
        <span className="bottomMarginSpan">
          결제 수단 : 수정버튼을 눌러 작성해주세요.
        </span>
        <span>예약 비고 : 수정버튼을 눌러 작성해주세요.</span>
      </div>
      <div className="EditBtnContainer">
        <button type="button">
          <Icons.TbPencilMinus size={17} />
          수정
        </button>
      </div>
    </ReserveCell>
  );
};

export default ReserveCellLayout;
