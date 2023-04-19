import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  width: 100%;
  height: 100%;
  background-color: #f4f6fb;
  /* border: 5px solid aqua; */
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
  margin: 8rem 0 0 8rem;
  font-size: 3rem;
  font-weight: 600;
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
        <ReserveWrapper>{needResrveArr}</ReserveWrapper>
      </Wrapper>
    </>
  );
}

export default Reservation;
