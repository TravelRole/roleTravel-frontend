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

function SpaceList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isAddModal, setIsAddModal] = useState(false);

  const { isAuth } = useSelector((state) => state.auth);
  const { signUpSuccess } = useSelector((state) => state.sign);
  const { currentTravelingList, currentEndTravelList, isTravelLoading } =
    useSelector((state) => state.travel);

  useEffect(() => {
    // isAuth로 판단하는게 나은지, 의논해야함
    if (!localStorage.getItem("accessToken")) {
      navigate(`/login`);
      return;
    }
    dispatch(getTravelList());
  }, [dispatch, navigate]);

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

  useEffect(() => {
    if (signUpSuccess) {
      dispatch(getUserInfo());
    }
  }, [signUpSuccess, dispatch]);

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
            {isTravelLoading ? (
              <SyncLoader color={"#3884fd"} />
            ) : (
              <>
                <div>
                  <h2>진행중인 계획 목록</h2>
                  {currentTravelingList?.length === 0 ? (
                    <p>진행중인 계획 리스트가 없습니다.</p>
                  ) : (
                    currentTravelingList?.map((list) => (
                      <Space key={list.roomId} {...list} />
                    ))
                  )}
                </div>
                <div>
                  <h2>완료된 계획 목록</h2>
                  {currentEndTravelList?.length === 0 ? (
                    <p>완료된 계획 리스트가 없습니다.</p>
                  ) : (
                    currentEndTravelList?.map((list) => (
                      <Space key={list.roomId} {...list} />
                    ))
                  )}
                </div>
              </>
            )}
          </div>
        </SpaceListContent>
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
