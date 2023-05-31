import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Reservation from "../Role/Reservation/Reservation";
import Account from "../Role/Account/Account";
import Essentials from "../Role/Essentials/Essentials";
import Schedule from "../Role/Schedule/Schedule";
import AllPlan from "../Role/AllPlan/AllPlan";
import Sidebar from "./Sidebar/Sidebar";
import { useSelector } from "react-redux";
import Modal from "../../components/Modal";
import RoomDeleteModal from "./Sidebar/DeleteMenuModal/RoomDeleteModal";
import RoomEditModal from "./Sidebar/EditMenuModal/RoomEditModal";
import InvitationModal from "./Sidebar/Invitation/InvitationModal";
import MandateRoleModal from "./Sidebar/MandateRoleModal/MandateRoleModal";

const TeamSpaceBox = styled.div`
  display: flex;
`;

const SpaceContainer = styled.div`
  overflow-x: hidden;
  height: 100vh;
  min-width: 140rem;
  flex: 2;
  display: flex;
  flex-direction: column;
  padding-left: 24rem;
  background-color: #f6f8fc;
`;

function TeamSpace() {
  const navigate = useNavigate();
  const { sidebarData } = useSelector((state) => state.sidebar);
  const { roomData } = useSelector((state) => state.allPlan);
  const [openRoomEditModal, setOpenRoomEditModal] = useState(false);
  const [openRoomDeleteModal, setOpenRoomDeleteModal] = useState(false);
  const [openInvitationModal, setOpenInvitationModal] = useState(false);

  const { role } = useParams();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate(`/login`);
      return;
    }
  }, [navigate]);

  return (
    <>
      <TeamSpaceBox>
        <Sidebar
          setOpenRoomDeleteModal={setOpenRoomDeleteModal}
          setOpenRoomEditModal={setOpenRoomEditModal}
          setOpenInvitationModal={setOpenInvitationModal}
        />
        <SpaceContainer>
          {
            {
              allplan: <AllPlan />,
              schedule: <Schedule />,
              reservation: <Reservation />,
              account: <Account />,
              essentials: <Essentials />,
            }[role]
          }
        </SpaceContainer>
        {openRoomEditModal && (
          <Modal width="51.8rem" setIsOpenModal={setOpenRoomEditModal}>
            <RoomEditModal setOpenRoomEditModal={setOpenRoomEditModal} />
          </Modal>
        )}
        {openRoomDeleteModal &&
          (sidebarData?.roles?.includes("총무") && roomData.roles.length > 1 ? (
            <Modal width="41.8rem" setIsOpenModal={setOpenRoomDeleteModal}>
              <MandateRoleModal
                setOpenRoomDeleteModal={setOpenRoomDeleteModal}
              />
            </Modal>
          ) : (
            <Modal width="41.8rem" setIsOpenModal={setOpenRoomDeleteModal}>
              <RoomDeleteModal
                setOpenRoomDeleteModal={setOpenRoomDeleteModal}
              />
            </Modal>
          ))}
        {openInvitationModal && (
          <Modal width="72.8rem" setIsOpenModal={setOpenInvitationModal}>
            <InvitationModal />
          </Modal>
        )}
      </TeamSpaceBox>
    </>
  );
}

export default TeamSpace;
