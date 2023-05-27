import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import MandateRoleLi from "./MandateRoleLi";
import { mandateRoleAndDelete } from "../sidebarSlice";

const MandateRoleModalWrap = styled.div``;

const MandateRoleModalHeader = styled.div`
  dl {
    padding: 2.6rem 2.4rem 1.7rem 2.4rem;

    dt {
      font-size: 1.6rem;
      color: #ffc759;
      font-weight: 600;
      font-family: "Unbounded", cursive;
      margin-bottom: 0.4rem;
    }
    dd {
      font-size: 2.4rem;
    }
  }
`;

const MandateRoleModalRoleWrap = styled.div`
  border-bottom: 0.1rem solid #e6e6e6;
  border-top: 0.1rem solid #e6e6e6;
  padding: 2.5rem 2.4rem 3rem 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-y: auto;
  max-height: 40rem;
  dl.delete-modal-text {
    dt {
      font-size: 1.8rem;
      color: #333;
      margin-bottom: 1rem;
      span {
        font-size: 1.8rem;
        color: #3884fd;
      }
    }
    dd {
      font-size: 1.4rem;
      color: #a7a7a7;
      line-height: 2rem;
    }
  }
`;

const MandateRoleModalRoleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MandateRoleModalFooter = styled.div`
  padding: 2rem 2.4rem;
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 1rem;
`;

const MandateRoleModal = ({ setOpenRoomDeleteModal }) => {
  const { roomData } = useSelector((state) => state.allPlan);
  const { roles } = roomData ?? {};
  const [newEmail, setNewEmail] = useState("");
  const { roomId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleMandateRole = useCallback(() => {
    const data = { roomId: roomId, email: newEmail };
    dispatch(mandateRoleAndDelete(data)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        window.alert("총무 위임에 성공했습니다. 팀 스페이스에서 탈퇴합니다.");
        navigate("/spaceList");
      }
    });
  }, [dispatch, navigate, newEmail, roomId]);

  return (
    <MandateRoleModalWrap>
      <MandateRoleModalHeader>
        <dl>
          <dt>DELEGATE</dt>
          <dd>총무 권한 위임</dd>
        </dl>
      </MandateRoleModalHeader>
      <MandateRoleModalRoleWrap>
        <dl className="delete-modal-text">
          <dt>
            팀스페이스 탈퇴 시 <span>총무 권한 위임</span>이 필요합니다.
          </dt>
          <dd>
            위임받은 인원은 기존 역할에서 총무 역할로 자동 변경됩니다.
            <br />
            총무 역할을 위임할 사람을 선정해주세요.
          </dd>
        </dl>
        <MandateRoleModalRoleContainer>
          {roles?.map((role, index) =>
            role.roles.includes("총무") ? null : (
              <MandateRoleLi
                key={index}
                index={index}
                newEmail={newEmail}
                setNewEmail={setNewEmail}
                {...role}
              />
            )
          )}
        </MandateRoleModalRoleContainer>
      </MandateRoleModalRoleWrap>
      <MandateRoleModalFooter>
        <Button
          onClick={() => {
            setOpenRoomDeleteModal(false);
          }}
          color="stroke"
          size="x-small"
        >
          취소
        </Button>
        <Button
          type="button"
          color="blue"
          size="x-small"
          onClick={handleMandateRole}
        >
          확인
        </Button>
      </MandateRoleModalFooter>
    </MandateRoleModalWrap>
  );
};

export default MandateRoleModal;
