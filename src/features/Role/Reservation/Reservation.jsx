import { useEffect, useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import ReserveCellLayout from "./layout/ReserveCell";
import BlankPanel from "./layout/BlankPanel";
import SmallBlank from "./layout/SmallBlank";
import Modal from "../../../components/Modal";
import EditReserveModal from "./layout/EditReserveModal";
import { useDispatch, useSelector } from "react-redux";
import { getReserveList } from "./reserveSlice";
import { useParams } from "react-router-dom";
import { getTravelDay } from "../Schedule/travelDaySlice";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  background-color: #f4f6fb;

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
  padding: 8.5rem 0 6rem 6rem;
  font-size: 3rem;
  font-weight: 600;
`;

const StyledBox = styled(Box)`
  padding-left: 6rem;
`;

const StyledTabs = styled(TabList)`
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
  text-align: left;
  gap: 0.5rem;
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

const StyledTabPanel = styled(TabPanel)`
  margin-right: 2.6rem;
  padding: 0 !important;
`;

const StyleTab = styled(Tab)`
  margin-right: 2.6rem !important;
`;

const ReserveWrapper = styled.div`
  display: grid;
  padding: 3rem 5rem !important;
  height: 100%;
`;

const InsidePanel = styled.div`
  display: grid;
  gap: 1.6rem;
  grid-template-columns: repeat(2, 50%);
`;

const ReserveListColumn = styled.div`
  min-width: 61rem;
  padding: 2.5rem;
  background-color: #eef1f8;
  border-radius: 1.6rem;
  height: fit-content;
  & > header {
    display: flex;
    align-items: center;
    margin-bottom: 2.5rem;

    font-size: 2.4rem;
    font-weight: 600;
    color: black;

    .countList {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 4.3rem;
      height: 2.9rem;

      margin-left: 1rem;
      padding: 0.5rem 1.6rem;
      background: #ffffff;
      border: 0.1rem solid #dadada;
      border-radius: 9.9rem;
    }
  }
`;

function Reservation() {
  const { roomId } = useParams();
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { travelDayList } = useSelector((state) => state.travelDay);

  const firstDay = travelDayList[0]?.date;
  const [date, setDate] = useState();
  const [editReserve, setEditReserve] = useState();

  useEffect(() => {
    setDate(firstDay);
  }, [firstDay]);

  useEffect(() => {
    dispatch(getTravelDay(roomId));
  }, [dispatch, roomId]);

  useEffect(() => {
    if (date) dispatch(getReserveList({ roomId, date }));
  }, [dispatch, roomId, date]);

  const { reservationList } = useSelector((state) => state.reserveList);

  const isUndefined = reservationList.length;

  //예약이 필요한 객체들만 분류
  const needResrve =
    reservationList &&
    reservationList.filter((item) => item.isBooked === false);

  //예약이 완료된 객체들만 분류
  const doneResrve =
    reservationList && reservationList.filter((item) => item.isBooked === true);

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
                        if (date) dispatch(getReserveList({ roomId, date }));
                      }}
                    />
                  );
                })}
              </StyledTabs>
            </StyledBox>
            <ReserveWrapper>
              <StyledTabPanel value={value}>
                {isUndefined === undefined || isUndefined.length === 0 ? (
                  <BlankPanel />
                ) : (
                  <InsidePanel>
                    <ReserveListColumn>
                      <header>
                        예약 예정
                        <span className="countList">{needResrve.length}</span>
                      </header>
                      {needResrve.length ? (
                        needResrve.map((element) => (
                          <ReserveCellLayout
                            key={element.bookInfoId}
                            element={element}
                            date={date}
                            setIsOpenModal={setIsOpenModal}
                            setEditReserve={setEditReserve}
                          ></ReserveCellLayout>
                        ))
                      ) : (
                        <SmallBlank classify={"expected"} />
                      )}
                    </ReserveListColumn>
                    <ReserveListColumn>
                      <header>
                        최종 일정
                        <span className="countList">{doneResrve.length}</span>
                      </header>
                      {doneResrve.length ? (
                        doneResrve.map((element) => (
                          <ReserveCellLayout
                            key={element.bookInfoId}
                            element={element}
                            date={date}
                            setIsOpenModal={setIsOpenModal}
                            setEditReserve={setEditReserve}
                          ></ReserveCellLayout>
                        ))
                      ) : (
                        <SmallBlank classify={"Done"} />
                      )}
                    </ReserveListColumn>
                  </InsidePanel>
                )}
              </StyledTabPanel>
            </ReserveWrapper>
          </TabContext>
        </Box>
        {isOpenModal ? (
          <Modal width="46rem" setIsOpenModal={setIsOpenModal}>
            <EditReserveModal
              setIsOpenModal={setIsOpenModal}
              editReserve={editReserve}
            />
          </Modal>
        ) : null}
      </Wrapper>
    </>
  );
}

export default Reservation;
