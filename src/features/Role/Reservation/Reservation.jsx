import { useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Icons from "../../../assets/icon/icon";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  background-color: #f4f6fb;
  /* border: 5px solid aqua; */

  font-size: 1.6rem;
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
  margin: 8rem 0 5.5rem 8rem;
  font-size: 3rem;
  font-weight: 600;
`;

const StyledBox = styled(Box)`
  padding-left: 8rem;
`;

const StyledTabs = styled(TabList)`
  position: relative;
  top: 0.25rem;

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
  text-align: left;
  width: 100%;
  padding-left: 1.5rem;
  padding-bottom: 1.2rem;
  padding-right: 5rem;
`;

const Day = styled.div`
  font-family: "Pretendard";
  font-size: 2.4rem;
  color: rgba(83, 100, 127, 1); ;
`;

const Date = styled.div`
  font-family: "Pretendard";
  font-size: 1.8rem;
  color: rgba(132, 144, 164, 1);
`;

const StyledTabPanel = styled(TabPanel)`
  padding: 0 !important;
  border: 5px solid blueviolet;
`;
const ReservationDay = [
  { CountDay: 1, Date: "4.17(월)" },
  { CountDay: 2, Date: "4.18(화)" },
  { CountDay: 3, Date: "4.19(수)" },
  { CountDay: 4, Date: "4.20(목)" },
  { CountDay: 5, Date: "4.21(금)" },
  { CountDay: 6, Date: "4.22(토)" },
  { CountDay: 7, Date: "4.23(일)" },
];

const ReserveWrapper = styled.div`
  display: grid;
  padding: 7.4rem 8rem !important;
  height: 100%;

  border: 5px solid aqua;
`;

const InsidePanel = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  border: 5px solid palegreen;
`;

const ReserveListColumn = styled.div`
  padding-right: 13rem;
  /* border: 5px solid plum; */
  & > header {
    margin-bottom: 2.5rem;

    font-size: 2.6rem;
    font-weight: 600;
    color: black;
  }
`;

const ReserveCell = styled.div`
  /* border: 2px solid purple; */
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  position: relative;
  padding: 2.5rem;
  border-radius: 1.6rem;
  background-color: white;
  box-shadow: 0px 5px 19px rgba(92, 119, 163, 0.1);
  .checkBoxContainer {
    margin-right: 1rem;
  }
  .ReserveDetail {
    display: flex;
    flex-direction: column;

    & > .place_Name {
      display: flex;
      flex-direction: row;
      margin-bottom: 2.5rem;
      color: #333333;
      font-weight: 700;
      font-size: 1.8rem;
      & > .placeCategory {
        margin-left: 1.8rem;
        padding: 0.5rem 1.5rem;
        font-size: 1.6rem;
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

function Reservation({ reserveList }) {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  return (
    <>
      <Wrapper>
        <PageHeader>예약</PageHeader>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <StyledBox sx={{ borderBottom: 2, borderColor: "#D8E2F4" }}>
              <StyledTabs
                indicatorColor="linear-gradient(270deg, #3884fd 0%, #9fa9ff 100%)"
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                {ReservationDay.map((item, i) => {
                  return (
                    <Tab
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
              </StyledTabs>
            </StyledBox>
            <ReserveWrapper>
              {" "}
              <StyledTabPanel value="1">
                <InsidePanel>
                  <ReserveListColumn>
                    <header>예약필요</header>
                    <ReserveCell>
                      <div className="checkBoxContainer">
                        <input type="checkbox"></input>
                      </div>
                      <div className="ReserveDetail">
                        <span className="place_Name">
                          고내-광령 올레{" "}
                          <div className="placeCategory">숙박</div>
                        </span>
                        <span>시간 : 10:00</span>
                        <span>링크 : 없음</span>
                        <span className="bottomMarginSpan">
                          일정비고 : 없음
                        </span>
                        <span>금액 : 수정버튼을 눌러 작성해주세요.</span>
                        <span className="bottomMarginSpan">
                          결제 수단 : 수정버튼을 눌러 작성해주세요.
                        </span>
                        <span>예약 비고 : 수정버튼을 눌러 작성해주세요.</span>
                      </div>
                      <div className="EditBtnContainer">
                        <button type="button">
                          <Icons.TbPencilMinus size={17}/>
                          수정
                        </button>
                      </div>
                    </ReserveCell>
                  </ReserveListColumn>
                  <ReserveListColumn>
                    <header>예약완료</header>
                  </ReserveListColumn>
                </InsidePanel>
              </StyledTabPanel>
              <StyledTabPanel value="2">Item Two</StyledTabPanel>
              <StyledTabPanel value="3">Item Three</StyledTabPanel>
              <StyledTabPanel value="4">Item 4</StyledTabPanel>
              <StyledTabPanel value="5">Item 5</StyledTabPanel>
              <StyledTabPanel value="6">Item 6</StyledTabPanel>
              <StyledTabPanel value="7">Item 7</StyledTabPanel>
            </ReserveWrapper>
          </TabContext>
        </Box>
      </Wrapper>
    </>
  );
}

export default Reservation;
