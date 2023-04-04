import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { Container } from "../../components/Container";
import Header from "../layout/Header";
import Button from "../../components/Button";
import Space from "./layout/Space";
import jejuImage from "../../assets/images/image1.jpg";
import betImage from "../../assets/images/image2.jpg";
import gangnenunImage from "../../assets/images/image3.jpg";
import AddSpaceModal from "./layout/AddSpaceModal";
import Modal from "../../components/Modal";
import { useSelector } from "react-redux";

const SpaceListContent = styled.section`
  padding: 50px 0;
  .new-trip {
    display: flex;
    justify-content: right;
    margin-bottom: 50px;
  }

  div {
    h2 {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 30px;
    }
  }
`;

const planList = [
  {
    id: 0,
    title: "제주도 여행 가즈아",
    image: jejuImage,
    startDate: "2023-03-18",
    lastDate: "2023-03-20",
    location: "제주도",
    members: ["유리", "철수", "짱구"],
  },
  {
    id: 1,
    title: "베트남으로 떠나요!",
    image: betImage,
    startDate: "2023-04-08",
    lastDate: "2023-04-12",
    location: "베트남 다낭",
    members: ["맹구", "훈이", "진이", "동동이"],
  },
  {
    id: 2,
    title: "강릉에서 회만 먹는 여행",
    image: gangnenunImage,
    startDate: "2023-04-18",
    lastDate: "2023-04-19",
    location: "강원도 강릉시",
    members: ["희선", "길동", "지선", "유림"],
  },
];

function SpaceList() {
  const navigate = useNavigate();
  const [isAddModal, setIsAddModal] = useState(false);
  const [today, setToday] = useState(new Date());
  const [tomorrow, setTomorrow] = useState(new Date(today));
  const [currentTomorrow, setCurrentTomorrow] = useState(
    tomorrow.setDate(today.getDate() + 1)
  );
  const [dateRange, setDateRange] = useState([today, currentTomorrow]);
  const [startDate, endDate] = dateRange;

  const { isAuth } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuth) {
      navigate(`/login`);
      return;
    }
  }, [isAuth, navigate]);

  const showAddModal = useCallback(() => setIsAddModal(true), []);

  return (
    <>
      <Header />
      <Container>
        <SpaceListContent>
          <div className="new-trip">
            <Button
              color="#3884fd"
              border="none"
              fontColor={"white"}
              size="small"
              onClick={showAddModal}
            >
              새 여행 만들기
            </Button>
          </div>

          <div>
            <h2>여행 계획 목록</h2>
            {planList.map((plan) => (
              <Space key={plan.id} {...plan} />
            ))}
          </div>
        </SpaceListContent>
      </Container>
      {/* {isAddModal ? <AddSpaceModal setIsAddModal={setIsAddModal} /> : null} */}
      {isAddModal ? (
        <Modal setIsAddModal={setIsAddModal}>
          <AddSpaceModal />
        </Modal>
      ) : null}
    </>
  );
}

export default SpaceList;
