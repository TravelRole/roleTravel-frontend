import React, { useCallback, useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getInvitationCode } from "./invitationCodeSlice";
import Button from "../../../../components/Button";
import { toast } from "react-toastify";

const InvitationModalWrap = styled.div``;

const InvitationModalHeader = styled.div`
  border-bottom: 0.1rem solid #e6e6e6;
  dl {
    padding: 2.2rem 2.4rem 1.8rem 2.4rem;
    dt {
      font-size: 1.6rem;
      color: #ffc759;
      font-family: "Unbounded", cursive;
      margin-bottom: 0.4rem;
      font-weight: 600;
    }
    dd {
      font-size: 2.4rem;
      color: #333;
      span {
        font-weight: 600;
        font-size: 2.4rem;
      }
    }
  }
`;

const InvitationModalBody = styled.div`
  padding: 1.6rem 2.4rem 4.5rem 2.4rem;

  p.modal-body-text {
    font-size: 1.6rem;
    color: #8b8b8b;
    margin-bottom: 2rem;
  }

  .form-content {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    padding: 0 2.5rem 3.5rem 2.5rem;
    border-bottom: 0.1rem solid #e6e6e6;
  }

  .addTravelBtns {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    padding: 2rem 2.5rem;
  }

  p.expire-link {
    font-size: 1.3rem;
    color: #49454f;
    margin-top: 1rem;
  }
`;

const InvitationModalContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  p {
    flex: 2;
    padding: 1.4rem 1.6rem;
    border-radius: 0.8rem;
    border: 0.1rem solid #cfcfcf;
    color: #c4c4c4;
    font-weight: 400;
    font-size: 1.8rem;
  }
`;

const InvitationModal = () => {
  const { sidebarData } = useSelector((state) => state.sidebar);
  const { invitationLink } = useSelector((state) => state.invitationCode);
  const { roomId } = useParams();
  const [isCopy, setIsCopy] = useState(false);
  const dispatch = useDispatch();

  const onCopyInvitationCode = useCallback(() => {
    setIsCopy(true);
    toast.success("초대 링크가 복사되었습니다.", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }, []);

  useEffect(() => {
    dispatch(getInvitationCode(roomId));
  }, [dispatch, roomId]);
  return (
    <InvitationModalWrap>
      <InvitationModalHeader>
        <dl>
          <dt>INVITE</dt>
          <dd>
            <span>{sidebarData?.roomName}</span>에 초대하기
          </dd>
        </dl>
      </InvitationModalHeader>
      <InvitationModalBody>
        <p className="modal-body-text">
          현재 팀 스페이스에 친구를 초대하려면 링크를 공유하세요
        </p>
        <InvitationModalContent>
          <p>{invitationLink}</p>
          <CopyToClipboard text={invitationLink} onCopy={onCopyInvitationCode}>
            <Button size="x-small" color={isCopy ? "gray" : "blue"}>
              {isCopy ? "복사됨" : "복사"}
            </Button>
          </CopyToClipboard>
        </InvitationModalContent>
        <p className="expire-link">* 초대링크는 1일 후 만료됩니다.</p>
      </InvitationModalBody>
    </InvitationModalWrap>
  );
};

export default InvitationModal;
