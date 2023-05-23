import React from "react";
import styled from "styled-components";
import Icons from "../../../../assets/icon/icon";

const AmountWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2.5rem;
  padding: 0 6rem;
  padding-bottom: 6rem;
`;
const AmountBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 14.4rem;
  padding: 2.5rem;
  position: relative;

  background-color: white;
  border-radius: 1.6rem;

  header {
    color: #8b8b8b;
    font-weight: 600;
    font-size: 1.6rem;
  }
  p {
    color: #141414;
    font-size: 3rem;
    font-weight: 600;
  }

  span {
    color: #a7a7a7;
    font-size: 1.4rem;
    font-weight: 500;
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

    span,
    svg {
      font-size: 1.6rem;
      font-weight: 500;
      margin-right: 0.8rem;
      color: #a7a7a7;
    }
    svg {
      margin: 0;
    }
  }
`;

function AmountContainer() {
  return (
    <AmountWrapper>
      <AmountBox>
        <header>공통 경비</header>
        <p>1,500,000원</p>
        <span>수정하기를 클릭해 공동 경비를 입력해보세요!</span>
        <button>
          <span>수정하기</span> <Icons.FaChevronRight />{" "}
        </button>
      </AmountBox>
      <AmountBox>
        <header>남은 경비</header>
        <p>340,000원</p>
        <span>잔액을 파악해 경비를 효율적으로 관리해 보세요!</span>
      </AmountBox>
      <AmountBox>
        <header>여행 총 지출 금액</header>
        <p>1,160,000원</p>
        <span>일자별 지출 금액을 모두 합산한 금액입니다.</span>
      </AmountBox>
    </AmountWrapper>
  );
}

export default AmountContainer;
