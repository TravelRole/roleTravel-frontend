import styled from "styled-components";
import React, { useState } from "react";
import Icons from "../../../assets/icon/icon";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  /* border: 5px solid aqua; */
  background-color: #f4f6fb;
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

const PageHeader = styled.header`
  padding: 7.8rem 0 3rem 6rem;
  font-size: 3rem;
  font-weight: 600;
`;

const AmountContainer = styled.div`
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

const AmonutDetailContainer = styled.div``;
const AmountDetailHeader = styled.div`
  display: flex;
  flex-direction: row;

  padding-left: 6.2rem;
  padding-bottom: 3rem;
  header {
    font-weight: 600;
    font-size: 2.6rem;
    margin-right: 3rem;
  }
`;
const FilterSection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  div {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 6rem;
    height: 3rem;
    font-size: 1.6rem;
    font-weight: 500;

    color: #8b8b8b;
    border: 0.1rem solid #8b8b8b;
    border-radius: 9.9rem;
    background: #f4f6fb;

    cursor: pointer;
  }

  .active {
    color: #3884fd;
    border: 0.15rem solid #3884fd;
    border-radius: 9.9rem;
  }
`;

const AmountDetailBox = styled.div`
  width: 100%;
  height: 50rem;
`;

function Account() {
  const [feeMethod, setFeeMethod] = useState("all");

  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Wrapper>
        <PageHeader>회계 목록</PageHeader>
        <AmountContainer>
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
        </AmountContainer>
        <AmonutDetailContainer>
          <AmountDetailHeader>
            <header>일자별 지출 금액</header>
            <FilterSection>
              <div
                className={feeMethod === "all" ? "active" : null}
                onClick={() => setFeeMethod("all")}
              >
                전체
              </div>
              <div
                className={feeMethod === "card" ? "active" : null}
                onClick={() => setFeeMethod("card")}
              >
                카드
              </div>
              <div
                className={feeMethod === "cash" ? "active" : null}
                onClick={() => setFeeMethod("cash")}
              >
                현금
              </div>
            </FilterSection>
          </AmountDetailHeader>
          <AmountDetailBox>
            <Box>
              <TabContext value={value}>
                <StyledBox sx={{ borderBottom: 2, borderColor: "#D8E2F4" }}>
                  <StyledScheduleTabs
                    indicatorColor="linear-gradient(270deg, #3884fd 0%, #9fa9ff 100%)"
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    {ReservationDay.map((item, i) => {
                      return (
                        <StyleTab
                          key={i}
                          label={
                            <DateBox>
                              <Day>{item.CountDay}일차</Day>
                              <Date>{item.Date}</Date>
                            </DateBox>
                          }
                          value={`${i + 1}`}
                        />
                      );
                    })}
                  </StyledScheduleTabs>
                </StyledBox>
                <ScheduleWrapper>
                  <StyledTabPanel value="1">
                    <ColumnHeader>
                      <PlaceNameColumn>지출 내역</PlaceNameColumn>
                      <DetailColumn>결제수단</DetailColumn>
                      <DetailColumn>카테고리</DetailColumn>
                      <DetailColumn>금액 </DetailColumn>
                      <DetailFeeColumn>예약 비고</DetailFeeColumn>
                      <NoteDetailColumn>회계 비고</NoteDetailColumn>
                    </ColumnHeader>
                    <ScheduleDetails>
                      <ScheduleRow>
                        <PlaceNameColumn>
                          <input type="checkbox" />
                          연돈이게최대몇자까지
                        </PlaceNameColumn>
                        <DetailColumn>10:00</DetailColumn>
                        <DetailColumn>필요</DetailColumn>
                        <DetailColumn>식당</DetailColumn>
                        <DetailFeeColumn>
                          <span>예약비고 텍스트가 이곳에 들어갑니다 </span>
                        </DetailFeeColumn>
                        <NoteDetailColumn>
                          <span>회계비고 텍스트가 이곳에 들어갑니다 </span>
                        </NoteDetailColumn>
                      </ScheduleRow>
                      <AllAcountRow>
                        <span>총 지출 금액</span>
                        <span>1,231,230원</span>
                      </AllAcountRow>
                    </ScheduleDetails>
                  </StyledTabPanel>
                  <StyledTabPanel value="2">two</StyledTabPanel>
                  <StyledTabPanel value="3">Item Three</StyledTabPanel>
                </ScheduleWrapper>
              </TabContext>
            </Box>
          </AmountDetailBox>
        </AmonutDetailContainer>
      </Wrapper>
    </>
  );
}
export default Account;

const ReservationDay = [
  { CountDay: 1, Date: "4.17(월)" },
  { CountDay: 2, Date: "4.18(화)" },
  { CountDay: 3, Date: "4.19(수)" },
  { CountDay: 4, Date: "4.20(목)" },
  { CountDay: 5, Date: "4.21(금)" },
  { CountDay: 6, Date: "4.22(토)" },
  { CountDay: 7, Date: "4.23(일)" },
];

const StyledBox = styled(Box)`
  padding-left: 6rem;
`;

const StyledScheduleTabs = styled(TabList)`
  position: relative;
  top: 0.3rem;

  .MuiButtonBase-root {
    text-align: left;
    padding: 0;
  }
  .MuiTabs-indicator {
    height: 0.4rem;
    width: 100%;
    border-radius: 1rem;
    background-image: ${({ indicatorColor }) => indicatorColor};
  }
`;

const DateBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: left;
  width: 100%;
  padding-bottom: 1.5rem;
  padding-right: 7.5rem;
`;

const Day = styled.div`
  font-family: "Pretendard";
  font-size: 2rem;
  color: rgba(83, 100, 127, 1);
`;

const Date = styled.div`
  font-family: "Pretendard";
  font-size: 1.6rem;
  color: rgba(132, 144, 164, 1);
`;

const StyleTab = styled(Tab)`
  margin-right: 2.6rem !important;
`;

const StyledTabPanel = styled(TabPanel)`
  padding: 0 !important;
`;

const ScheduleWrapper = styled.div`
  padding: 3rem 6rem 0 6rem !important;
`;
const ColumnHeader = styled.div`
  display: flex;
  flex-direction: row;

  width: 100%;
  height: 5rem;
  padding: 1.4rem 0;
  background: #eef1f8;
  border-radius: 0.8rem;
  div {
    display: flex;
    justify-content: center;
  }
`;

const Column = styled.div`
  display: flex;
  flex: ${(props) => props.flex};
  justify-content: center;
  align-items: center;

  font-weight: 500;
  font-size: 1.8rem;
  color: #8490a4;
  border-right: 0.2rem solid #d8e2f4;
`;
const PlaceNameColumn = styled(Column)`
  width: 23%;
  justify-content: flex-start;
  font-weight: 500;
  color: #333333;
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
    margin: 0 1.5rem;
    cursor: pointer;

    &:checked {
      background-color: #3884fd;
      background-image: url("data:image/svg+xml,%3Csvg width='14' height='9' viewBox='0 0 14 9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.78247 4.27374L5.4121 7.89268L12.2177 1.10718' stroke='%23F5F5F5' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-size: 80% 80%;
      background-position: 50%;
      background-repeat: no-repeat;
    }
  }
`;
const DetailColumn = styled(Column)`
  font-size: 1.6rem;
  width: 7%;
`;

const DetailFeeColumn = styled(DetailColumn)`
  width: 28%;

  span {
    height: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    font-size: 1.6rem;

    &::-webkit-scrollbar-button {
      width: 0;
      height: 0;
    }
    &::-webkit-scrollbar {
      height: 0.4rem;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background-color: #cdcdf4;
    }
  }
`;

const NoteColumn = styled(Column)`
  border-right: none;
`;

const NoteDetailColumn = styled(NoteColumn)`
  width: 28%;

  justify-content: center;
  padding: 0 1rem;

  span {
    height: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    font-size: 1.6rem;

    &::-webkit-scrollbar-button {
      width: 0;
      height: 0;
    }
    &::-webkit-scrollbar {
      height: 0.4rem;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background-color: #cdcdf4;
    }
  }
`;

const ScheduleDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  padding: 1.5rem 0;
`;

const ScheduleRow = styled.div`
  display: flex;
  flex-direction: row;
  background: #ffffff;
  padding: 1.3rem 0;
  border-radius: 0.8rem;
`;

const AllAcountRow = styled(ScheduleRow)`
  justify-content: space-between;
  width: 44%;
  padding: 1.2rem 2rem;
  span {
    font-weight: 500;
    font-size: 2rem;
    color: #333333;
  }
`;
