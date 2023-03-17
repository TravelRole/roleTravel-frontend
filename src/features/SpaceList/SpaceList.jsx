import { useCallback, useEffect, useRef } from "react";
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

const SpaceListContent = styled.section`
  padding: 50px 0;
  ul {
    display: flex;
    justify-content: right;
    gap: 10px;
  }

  div {
    margin-top: 50px;
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

function SpaceList({ Auth }) {
  const navigate = useNavigate();
  const modalRef = useRef(null);

  useEffect(() => {
    if (Auth) {
      console.log(Auth);
      navigate(`/login`);
      return;
    }
  }, []);

  const showAddModal = useCallback(() => {
    modalRef.current.showModal();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <SpaceListContent>
          <ul>
            <li>
              <Button
                color="#3884fd"
                border="none"
                fontColor={"white"}
                size="small"
              >
                초대코드 입력
              </Button>
            </li>
            <li>
              <Button
                color="#3884fd"
                border="none"
                fontColor={"white"}
                size="small"
                onClick={showAddModal}
              >
                새 여행 만들기
              </Button>
            </li>
          </ul>
          <div>
            <h2>여행 계획 목록</h2>
            {planList.map((plan) => (
              <Space key={plan.id} {...plan} />
            ))}
          </div>
        </SpaceListContent>
      </Container>
      <AddSpaceModal modalRef={modalRef} />
    </>
  );
}

export default SpaceList;
