import styled from "styled-components";
import React, { useState } from "react";

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

const EquationContainer = styled.div`
  border: 3px solid purple;
  margin: 1rem;
`;

const AccountContainer = styled.div`
  border: 3px solid blue;
  margin: 1rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
`;

const SmallTitle = styled.div`
  padding: 1rem;
  font-weight: bold;
  font-size: 1.3rem;
`;

const DayRangeContainer = styled.div`
  border: 2px solid black;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const DayBox = styled.div`
  box-shadow: 0 0 0 0.3px gray;
  padding: 10px;
  border: ${(props) => (props.selected ? "2px solid black" : "none")};

  &:hover {
    background-color: skyblue;
    cursor: pointer;
  }
`;

const Day = styled.div``;
const Date = styled.div``;

const AccountDetailContainer = styled.div`
  border: 2px solid black;
  padding: 1rem;
  margin: 1rem;
`;

const ColumnBox = styled.div`
  flex: ${(props) => (props.flex === undefined ? 2 : props.flex)};
  padding: 0.5rem;
  box-shadow: 0 0 0 0.3px gray;
  overflow: scroll;
  white-space: nowrap;
  overflow: scroll hidden;

  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
  &::-webkit-scrollbar {
    width: 3px;
    height: 5px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #cdcdf4;
  }
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const DayTime = [
  { Day: "1일차", Date: "03.10(금)" },
  { Day: "2일차", Date: "03.11(토)" },
  { Day: "3일차", Date: "03.12(일)" },
];

const AccountDetails = {
  1: [
    {
      지출내역: "고내-광령올레",
      결제수단: "카드",
      카테고리: "숙소",
      금액: 50000,
    },
    {
      지출내역: "제주도 튤립길",
      결제수단: "현금",
      카테고리: "관광",
      금액: 3000,
    },
    {
      지출내역: "부산해운대출입",
      결제수단: "카드",
      카테고리: "액티비티",
      금액: 70000,
    },
    {
      지출내역: "루프탑수영장",
      결제수단: "현금",
      카테고리: "액티비티",
      금액: 100000,
    },
  ],
  2: [
    {
      지출내역: "고내-광령올레",
      결제수단: "카드",
      카테고리: "숙소",
      금액: 50000,
    },
    {
      지출내역: "제주도 튤립길",
      결제수단: "현금",
      카테고리: "관광",
      금액: 3000,
    },
    {
      지출내역: "부산해운대출입",
      결제수단: "카드",
      카테고리: "액티비티",
      금액: 70000,
    },
  ],
  3: [
    {
      지출내역: "고내-광령올레",
      결제수단: "카드",
      카테고리: "숙소",
      금액: 50000,
    },
  ],
};

function Account() {
  const [day, setDay] = useState(1);
  const [checked, setChecked] = useState();

  const [selectedValue, setSelectedValue] = useState("all");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      <Wrapper>
        <h1 style={{ fontSize: "25px", margin: "1rem", fontWeight: "bold" }}>
          회계
        </h1>
        <EquationContainer>전체공금 - 사용금액 = 잔액</EquationContainer>
        <AccountContainer>
          <Header>
            <SmallTitle>일자별 지출 금액</SmallTitle>
            <span>
              <select name="countries">
                <option value="usa">미국</option>
                <option value="kor" selected>
                  한국
                </option>
                <option value="chn">중국</option>
                <option value="jpn">일본</option>
              </select>
            </span>
          </Header>
          <DayRangeContainer className="일차컨테이너">
            {DayTime.map((item, i) => {
              return (
                <DayBox
                  key={i}
                  className="일자박스"
                  onClick={() => {
                    setDay(i + 1);
                    setChecked(false);
                  }}
                  selected={i + 1 === day ? true : false}
                >
                  <Day>{item.Day}</Day>
                  <Date>{item.Date}</Date>
                </DayBox>
              );
            })}
          </DayRangeContainer>
        </AccountContainer>
        <span style={{ margin: "0rem 1rem" }}>
          <select
            name="type"
            value={selectedValue}
            onChange={handleSelectChange}
          >
            <option value="all">전체</option>
            <option value="card">카드</option>
            <option value="cash">현금</option>
          </select>
        </span>
        <AccountDetailContainer>
          <ColumnContainer>
            <ColumnBox flex={0.5}></ColumnBox>
            <ColumnBox flex={0.5}>순번</ColumnBox>
            <ColumnBox>지출내역</ColumnBox>
            <ColumnBox>결제수단</ColumnBox>
            <ColumnBox>카테고리</ColumnBox>
            <ColumnBox>금액</ColumnBox>
          </ColumnContainer>

          {AccountDetails[day]
            .filter((item) => {
              if (selectedValue === "all") return true;
              if (selectedValue === "card") return item["결제수단"] === "카드";
              if (selectedValue === "cash") return item["결제수단"] === "현금";
            })
            .map((item, i) => {
              const uniqueKey = day + (i + 1);
              return (
                <ColumnContainer key={i}>
                  <ColumnBox flex={0.5}>
                    <input
                      key={uniqueKey}
                      type="checkbox"
                      checked={uniqueKey === checked ? true : false}
                      onChange={() => {
                        console.log(uniqueKey);
                        setChecked(uniqueKey);
                      }}
                    ></input>
                  </ColumnBox>
                  <ColumnBox flex={0.5}>{i + 1}</ColumnBox>
                  <ColumnBox>{item["지출내역"]}</ColumnBox>
                  <ColumnBox>{item["결제수단"]}</ColumnBox>
                  <ColumnBox>{item["카테고리"]}</ColumnBox>
                  <ColumnBox>{item["금액"]}원</ColumnBox>
                </ColumnContainer>
              );
            })}
        </AccountDetailContainer>
      </Wrapper>
    </>
  );
}
export default Account;
