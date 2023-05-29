import styled from "styled-components";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AmountContainer from "./layout/AmountContainer";
import { useDispatch, useSelector } from "react-redux";
import { getTravelDay } from "../Schedule/travelDaySlice";
import { useParams } from "react-router-dom";
import { getAccountList } from "./accountSlice";
import Modal from "../../../components/Modal";
import AddEditAccountModal from "./layout/AddEditAccountModal";
import Icons from "../../../assets/icon/icon";

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
  padding: 0 6rem 0 6rem !important;
`;

const AddAccountSection = styled.section`
  margin: 2.2rem 0;
  width: 100%;

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #8490a4;
    font-family: "Pretendard";
    font-weight: 500;
    font-size: 1.8rem;
    background-color: transparent;
    border: none;

    cursor: pointer;

    svg {
      font-size: 1.5rem;
      margin-left: 0.8rem;
    }
  }
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
    background-image: url("data:image/svg+xml,%3Csvg width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='11.5' cy='11.5' r='11' stroke='%23DADADA'/%3E%3C/svg%3E%0A");
    background-size: 80% 80%;
    background-position: 50%;
    background-repeat: no-repeat;
    width: 2rem;
    height: 2rem;
    margin: 0 1.5rem;
    cursor: pointer;

    &:checked {
      background-image: url("data:image/svg+xml,%3Csvg width='23' height='23' viewBox='0 0 23 23' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='11.5' cy='11.5' r='11' fill='%23EEF1F8' style='mix-blend-mode:multiply'/%3E%3Ccircle cx='11.5' cy='11.5' r='11' stroke='%233884FD'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M17.6947 7.29279C17.8822 7.48031 17.9875 7.73462 17.9875 7.99979C17.9875 8.26495 17.8822 8.51926 17.6947 8.70679L9.69471 16.7068C9.50718 16.8943 9.25288 16.9996 8.98771 16.9996C8.72255 16.9996 8.46824 16.8943 8.28071 16.7068L4.28071 12.7068C4.09855 12.5182 3.99776 12.2656 4.00004 12.0034C4.00232 11.7412 4.10749 11.4904 4.29289 11.305C4.4783 11.1196 4.72911 11.0144 4.99131 11.0121C5.25351 11.0098 5.50611 11.1106 5.69471 11.2928L8.98771 14.5858L16.2807 7.29279C16.4682 7.10532 16.7225 7 16.9877 7C17.2529 7 17.5072 7.10532 17.6947 7.29279Z' fill='%233884FD'/%3E%3C/svg%3E ");
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

function Account() {
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const [feeMethod, setFeeMethod] = useState(undefined);

  const [value, setValue] = useState("1");

  const { travelDayList } = useSelector((state) => state.travelDay);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const firstDay = travelDayList[0]?.date;
  const [date, setDate] = useState();

  useEffect(() => {
    setDate(firstDay);
    dispatch(getTravelDay(roomId));
  }, [firstDay, dispatch, roomId]);

  useEffect(() => {
    dispatch(getAccountList({ roomId, date, feeMethod }));
  }, [feeMethod, date, roomId, dispatch]);
  const { accountList } = useSelector((state) => state.account);

  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <>
      <Wrapper>
        <PageHeader>회계 목록</PageHeader>
        <AmountContainer />
        <AmonutDetailContainer>
          <AmountDetailHeader>
            <header>일자별 지출 금액</header>
            <FilterSection>
              <div
                className={feeMethod === undefined ? "active" : null}
                onClick={() => setFeeMethod(undefined)}
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
                className={feeMethod === "credit" ? "active" : null}
                onClick={() => setFeeMethod("credit")}
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
                    {travelDayList.map(({ idx, date, day }) => {
                      const transformedDate =
                        date.split("-")[1] + "." + date.split("-")[2];
                      return (
                        <StyleTab
                          key={date}
                          label={
                            <DateBox>
                              <Day>{idx}일차</Day>
                              <Date>
                                {transformedDate}({day})
                              </Date>
                            </DateBox>
                          }
                          value={`${idx}`}
                          onClick={() => {
                            setDate(date);
                          }}
                        />
                      );
                    })}
                  </StyledScheduleTabs>
                </StyledBox>
                <ScheduleWrapper>
                  <AddAccountSection>
                    <button
                      onClick={() => {
                        setIsOpenModal(true);
                      }}
                    >
                      내역추가
                      <Icons.FaChevronRight />
                    </button>
                  </AddAccountSection>
                  <StyledTabPanel value={value}>
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
                </ScheduleWrapper>
              </TabContext>
            </Box>
          </AmountDetailBox>
        </AmonutDetailContainer>
        {isOpenModal ? (
          <Modal width="52rem" setIsOpenModal={setIsOpenModal}>
            <AddEditAccountModal setIsOpenModal={setIsOpenModal} />
          </Modal>
        ) : null}
      </Wrapper>
    </>
  );
}
export default Account;
