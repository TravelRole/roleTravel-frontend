import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getUserInfo } from "../Landing/userSlice";
import { getTravelList } from "./travelSlice";
import { SyncLoader } from "react-spinners";
import Traveling from "./layout/Traveling";
import EndTravel from "./layout/EndTravel";

const SpaceListContainer = styled.section`
  width: 100%;
  margin: 9rem auto;
`;

const SpaceHeader = styled.div`
  margin-bottom: 5.4rem;
  p {
    color: #a7a7a7;
    font-size: 2.4rem;
    font-weight: 400;
  }
`;

const SpaceContent = styled.div``;

const TravelNavTabWrap = styled.div`
  width: 100%;
  display: flex;
  gap: 4.6rem;
  margin-bottom: 3rem;
  border-bottom: 0.2rem solid #e1e1e1;
  position: relative;
`;

const TravelNavTab = styled.div`
  font-size: 4rem;
  color: ${({ selected }) => (selected ? "#333" : "#c4c4c4")};
  font-weight: 500;
  padding-bottom: 1.6rem;
  position: relative;
  cursor: pointer;
  transition: all 0.3s;
  span {
    font-size: 4rem;
    color: ${({ selected }) => (selected ? "#3884fd" : "#c4c4c4")};
  }
`;

const Indicator = styled.div`
  position: absolute;
  left: 0;
  bottom: -0.3rem;
  width: 26rem;
  border-radius: 0.5rem;
  height: 4px;
  background-image: linear-gradient(270deg, #3884fd 0%, #9fa9ff 100%);
  transform: ${({ activeIndex }) => `translateX(${activeIndex * 100}%)`};
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) 0ms;
`;

const HeaderNavData = [
  {
    span: "진행중",
    text: "인 계획",
  },
  {
    span: "완료",
    text: "된 계획",
  },
];

function SpaceList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isAddModal, setIsAddModal] = useState(false);
  const [currentNav, setCurrentNav] = useState(0);
  const { isAuth } = useSelector((state) => state.auth);
  const { signUpSuccess } = useSelector((state) => state.sign);
  // const { currentTravelingList, currentEndTravelList, isTravelLoading } =
  //   useSelector((state) => state.travel);

  const handleTravelNav = useCallback((index) => {
    setCurrentNav(index);
  }, []);

  // useEffect(() => {
  //   // isAuth로 판단하는게 나은지, 의논해야함
  //   if (!localStorage.getItem("accessToken")) {
  //     navigate(`/login`);
  //     return;
  //   }
  //   dispatch(getTravelList());
  // }, [dispatch, navigate]);

  // 구글로 로그인했을 때 보이는 토스트
  useEffect(() => {
    if (location.state?.isGoogleSuccess) {
      toast.success("구글 로그인이 되었습니다!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      navigate(location.pathname, { state: { isGoogleSuccess: false } });
    }
  }, [location.pathname, location.state?.isGoogleSuccess, navigate]);

  // 회원가입 하고 자동 로그인된 후 정보 받아오는 함수
  useEffect(() => {
    if (signUpSuccess) {
      dispatch(getUserInfo());
      dispatch(getTravelList());
    }
  }, [signUpSuccess, dispatch]);

  return (
    <>
      <Header />
      <Container>
        <SpaceListContainer>
          <SpaceHeader>
            <TravelNavTabWrap>
              {HeaderNavData.map((tab, index) => (
                <TravelNavTab
                  key={index}
                  selected={currentNav === index}
                  onClick={() => handleTravelNav(index)}
                >
                  <span>{tab.span}</span>
                  {tab.text}
                </TravelNavTab>
              ))}
              <Indicator activeIndex={currentNav} />
            </TravelNavTabWrap>
            <p>팀 스페이스에서 역할에 맞게 여행 계획을 관리해보세요.</p>
          </SpaceHeader>
          <SpaceContent>
            {currentNav === 0 ? <Traveling /> : <EndTravel />}
          </SpaceContent>
        </SpaceListContainer>
      </Container>
      {isAddModal ? (
        <Modal setIsAddModal={setIsAddModal}>
          <AddSpaceModal setIsAddModal={setIsAddModal} />
        </Modal>
      ) : null}
    </>
  );
}

export default SpaceList;
