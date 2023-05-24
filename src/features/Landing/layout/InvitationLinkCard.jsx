import React, { useCallback } from "react";
import Icons from "../../../assets/icon/icon";
import styled from "styled-components";

const InvitationLinkLi = styled.li`
  width: 100%;
  padding: 1.4rem 1.8rem;
  border: ${({ select }) =>
    select ? ".1rem solid #384ffd" : ".1rem solid #DADADA"};
  border-radius: 0.8rem;
  background-color: ${({ select }) => (select ? "#F4F6FB" : "#fff")};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;

  dl {
    dt {
      font-size: 2.2rem;
      color: ${({ select }) => (select ? `#3884fd` : `#141414`)};
      font-weight: 400;
      margin-bottom: 0.8rem;
    }
    dd {
      font-size: 1.6rem;
      font-weight: 400;
      color: ${({ select }) => (select ? `#3884fd` : `#8B8B8B`)};
    }
  }

  p {
    width: 2.1rem;
    height: 2.1rem;
    border-radius: 50%;
    border: ${({ select }) => (select ? "none" : ".1rem solid #d9d9d9")};
    background-color: ${({ select }) => (select ? "#3884fd" : "#fff")};
    span {
      width: 100%;
      height: 100%;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

const InvitationLinkCard = ({
  title,
  content,
  img,
  role,
  setSelectRole,
  selectRole,
}) => {
  const onClickRole = useCallback(() => {
    let newRoles = [...selectRole];
    if (newRoles.includes(role)) {
      newRoles = newRoles.filter((item) => item !== role);
    } else {
      newRoles.push(role);
    }
    setSelectRole(newRoles);
  }, [role, selectRole, setSelectRole]);

  const isSelected = selectRole.includes(role);

  return (
    <InvitationLinkLi onClick={onClickRole} select={isSelected}>
      <dl>
        <dt>{title}</dt>
        <dd>{content}</dd>
      </dl>
      <p>
        {isSelected && (
          <span>
            <Icons.HiCheck />
          </span>
        )}
      </p>
    </InvitationLinkLi>
  );
};

export default InvitationLinkCard;
