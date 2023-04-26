import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { checkInvitationCode, setUserRole } from "./userSlice";
import styled from "styled-components";
import accountingImg from "../../assets/images/accountingImg.png";
import scheduleImg from "../../assets/images/scheduleImg.png";
import reservationImg from "../../assets/images/reservationImg.png";
import noneRoleImg from "../../assets/images/noneRoleImg.png";
import InvitationLinkCard from "./layout/InvitationLinkCard";
import Button from "../../components/Button";
import { toast } from "react-toastify";

const SelectRoleBg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

const SelectRoleModalWrap = styled.div`
  width: 100%;
  max-width: 46rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 2rem 2rem rgba(0, 0, 0, 0.08),
    0px 0px 0.2rem rgba(0, 0, 0, 0.12);
  z-index: 20;
  border-radius: 1.6rem;
  background-color: #fff;
`;

const SelectRoleModalHeader = styled.div`
  border-bottom: 0.1rem solid #e6e6e6;
  dl {
    padding: 2.6rem 2.4rem;
    dt {
      font-size: 1.6rem;
      color: #ffc759;
      font-family: "Unbounded", cursive;
      margin-bottom: 1.4rem;
    }
    dd {
      font-size: 2.4rem;
    }
  }
`;

const SelectRoleModalBody = styled.div`
  border-bottom: 0.1rem solid #e6e6e6;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 1.6rem 2.4rem;
    gap: 0.7rem;
  }
`;

const SelectRoleModalFooter = styled.div`
  padding: 2rem 2.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: flex-end;
`;

const InvitationLinkLiData = [
  {
    role: "RESERVATION",
    title: "예약",
    content: (
      <dd>
        예약 리스트를
        <br />
        관리해보세요!
      </dd>
    ),
    img: reservationImg,
  },
  {
    role: "SCHEDULE",
    title: "일정",
    content: (
      <dd>
        효율적인
        <br />
        여행코스를
        <br />
        만들어보세요!
      </dd>
    ),
    img: scheduleImg,
  },
  {
    role: "ACCOUNTING",
    title: "회계",
    content: (
      <dd>
        빈틈없는
        <br />
        장부관리는
        <br />
        나에게!
      </dd>
    ),
    img: accountingImg,
  },
  {
    role: "NONE",
    title: "역할없음",
    content: (
      <dd>
        함께할 준비가
        <br />
        되셨나요?
      </dd>
    ),
    img: noneRoleImg,
  },
];

const InvitationLink = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { invitationCode } = useParams();
  const [isOpenSelectRole, setIsOpenSelectRole] = useState(false);
  const [selectRole, setSelectRole] = useState([]);

  const onSubmitSetUserRole = useCallback(() => {
    dispatch(setUserRole({ selectRole, invitationCode })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        navigate("/spaceList");
      }
    });
  }, [dispatch, invitationCode, navigate, selectRole]);

  useEffect(() => {
    dispatch(checkInvitationCode(invitationCode))
      .then((res) => {
        if (res.payload.status === 200) {
          setIsOpenSelectRole(true);
          return;
        } else if (res.payload.response.status === 400) {
          window.alert(res.payload.response.data.message);
          navigate("/spaceList");
        } else if (res.payload.response.status === 403) {
          window.alert("로그인을 해주세요.");
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch, invitationCode, navigate]);

  if (isOpenSelectRole) {
    return (
      <>
        <SelectRoleBg />
        <SelectRoleModalWrap>
          <SelectRoleModalHeader>
            <dl>
              <dt>ROLE</dt>
              <dd>담당하고자 하는 역할을 선택해주세요</dd>
            </dl>
          </SelectRoleModalHeader>
          <SelectRoleModalBody>
            <ul>
              {InvitationLinkLiData.map((item, index) => (
                <InvitationLinkCard
                  key={index}
                  {...item}
                  index={index}
                  setSelectRole={setSelectRole}
                  selectRole={selectRole}
                />
              ))}
            </ul>
          </SelectRoleModalBody>
          <SelectRoleModalFooter>
            <Button type="button" size="small" color="stroke">
              취소
            </Button>
            <Button
              type="button"
              size="small"
              color="blue"
              onClick={onSubmitSetUserRole}
            >
              입장하기
            </Button>
          </SelectRoleModalFooter>
        </SelectRoleModalWrap>
      </>
    );
  }
};

export default InvitationLink;
