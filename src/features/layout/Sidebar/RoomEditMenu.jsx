import React, { useState } from "react";
import styled from "styled-components";
import Icons from "../../../assets/icon/icon";
import Modal from "../../../components/Modal";
import RoomEditModal from "./EditMenuModal/RoomEditModal";
import RoomDeleteModal from "./EditMenuModal/RoomDeleteModal";

const RoomEditMenuWrap = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  li {
    font-size: 1.6rem;
    color: #707070;
    display: flex;
    align-items: center;
    cursor: pointer;

    span {
      width: 2rem;
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 0.5rem;
      svg {
        width: 100%;
        height: 100%;
      }
    }

    &:last-child {
      color: #ff334c;
    }
  }
`;

const RoomEditMenu = () => {
  const [openRoomEditModal, setOpenRoomEditModal] = useState(false);
  const [openRoomDeleteModal, setOpenRoomDeleteModal] = useState(false);
  return (
    <>
      <RoomEditMenuWrap>
        <li onClick={() => setOpenRoomEditModal((prev) => !prev)}>
          <span>
            <Icons.HiPencilAlt />
          </span>
          스페이스 설정
        </li>
        <li onClick={() => setOpenRoomDeleteModal((prev) => !prev)}>
          <span>
            <Icons.HiOutlineTrash />
          </span>
          스페이스 삭제
        </li>
      </RoomEditMenuWrap>
      {openRoomEditModal && (
        <Modal width="41.8rem" setIsOpenModal={setOpenRoomEditModal}>
          <RoomEditModal />
        </Modal>
      )}
      {openRoomDeleteModal && (
        <Modal width="41.8rem" setIsOpenModal={setOpenRoomDeleteModal}>
          <RoomDeleteModal />
        </Modal>
      )}
    </>
  );
};

export default RoomEditMenu;
