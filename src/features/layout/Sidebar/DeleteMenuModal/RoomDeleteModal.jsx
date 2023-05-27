import React from "react";
import { useCallback } from "react";
import styled from "styled-components";
import Icons from "../../../../assets/icon/icon";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { mandateRoleAndDelete } from "../sidebarSlice";

const RoomDeleteModalWrap = styled.div`
  padding: 3rem 2.4rem;
`;

const RoomDeleteModalHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  i {
    width: 3.5rem;
    height: 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffc759;
    svg {
      width: 100%;
      height: 100%;
    }
  }
  dl {
    text-align: center;
    dt {
      font-size: 2rem;
      color: #333;
      font-weight: 500;
      margin-bottom: 1rem;
      span {
        color: #3884fd;
        font-size: 2rem;
      }
    }
    dd {
      font-size: 1.6rem;
      color: #8b8b8b;
    }
  }
`;

const RoomDeleteModalFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  button {
    flex: 1;
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 0;
    border-radius: 0.8rem;
    color: #333;
    cursor: pointer;
    &:first-child {
      background-color: #fafafa;
      border: 0.1rem solid #c4c4c4;
    }

    &:last-child {
      background-color: #3884fd;
      color: #fff;
      border: none;
    }
  }
`;

const RoomDeleteModal = ({ setOpenRoomDeleteModal }) => {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDeleteRoom = useCallback(() => {
    const data = { roomId: roomId, email: "" };
    dispatch(mandateRoleAndDelete(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        window.alert("팀 스페이스에서 탈퇴가 완료되었습니다.");
        navigate("/spaceList");
      }
    });
  }, [dispatch, navigate, roomId]);
  return (
    <RoomDeleteModalWrap>
      <RoomDeleteModalHeader>
        <i>
          <Icons.RiErrorWarningLine />
        </i>
        <dl>
          <dt>
            정말 현재 팀스페이스에서 <span>탈퇴</span>하시겠습니까?
          </dt>
          <dd>삭제 이후에는 내용 복구가 불가능합니다.</dd>
        </dl>
      </RoomDeleteModalHeader>
      <RoomDeleteModalFooter>
        <button
          onClick={() => {
            setOpenRoomDeleteModal(false);
          }}
          color="stroke"
          size="med"
        >
          취소
        </button>
        <button
          type="button"
          color="blue"
          size="x-small"
          onClick={handleDeleteRoom}
        >
          확인
        </button>
      </RoomDeleteModalFooter>
    </RoomDeleteModalWrap>
  );
};

export default RoomDeleteModal;
