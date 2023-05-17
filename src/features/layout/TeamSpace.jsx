import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Reservation from "../Role/Reservation/Reservation";
import Account from "../Role/Account/Account";
import Essentials from "../Role/Essentials/Essentials";
import Schedule from "../Role/Schedule/Schedule";
import AllPlan from "../Role/Allplan/AllPlan";
import Sidebar from "./Sidebar/Sidebar";
import { useDispatch } from "react-redux";
import { getAllPlanList, getRoomData } from "../Role/Allplan/allPlanSlice";
import { getUserInfo } from "../Landing/userSlice";
import Modal from "../../components/Modal";
import RoomDeleteModal from "./Sidebar/DeleteMenuModal/RoomDeleteModal";
import RoomEditModal from "./Sidebar/EditMenuModal/RoomEditModal";

const TeamSpaceBox = styled.div`
  display: flex;
`;

const SpaceContainer = styled.div`
  overflow-x: hidden;
  height: 100vh;
  flex: 2;
  display: flex;
  flex-direction: column;
  padding-left: 24rem;
  background-color: #f6f8fc;
`;

function TeamSpace({ Auth }) {
  // const navigate = useNavigate();
  const [openRoomEditModal, setOpenRoomEditModal] = useState(false);
  const [openRoomDeleteModal, setOpenRoomDeleteModal] = useState(false);
  const [reserveList, setReserveList] = useState([]);
  const { role } = useParams();

  // useEffect(() => {
  //   // if (Auth) {
  //   //   console.log(Auth);
  //   //   navigate(`/login`);
  //   //   return;
  //   // }
  // }, [dispatch, roomId]);

  return (
    <>
      <TeamSpaceBox>
        <Sidebar
          setOpenRoomDeleteModal={setOpenRoomDeleteModal}
          setOpenRoomEditModal={setOpenRoomEditModal}
        />
        <SpaceContainer>
          {
            {
              allplan: <AllPlan />,
              schedule: <Schedule setReserveList={setReserveList} />,
              reservation: <Reservation reserveList={reserveList} />,
              account: <Account />,
              essentials: <Essentials />,
            }[role]
          }
        </SpaceContainer>
        {openRoomEditModal && (
          <Modal width="51.8rem" setIsOpenModal={setOpenRoomEditModal}>
            <RoomEditModal />
          </Modal>
        )}
        {openRoomDeleteModal && (
          <Modal width="51.8rem" setIsOpenModal={setOpenRoomDeleteModal}>
            <RoomDeleteModal />
          </Modal>
        )}
      </TeamSpaceBox>
    </>
  );
}

export default TeamSpace;
