import React, { useCallback } from "react";
import styled from "styled-components";

const InvitationLinkLi = styled.li`
  width: 100%;
  max-width: 20rem;
  height: 22rem;
  position: relative;
  background-image: ${({ select }) =>
    select
      ? `linear-gradient(
      158.89deg,
      #3884fd 13.46%,
      #6ca4fc 85.46%
    )`
      : `linear-gradient(
    163.47deg,
    #f2f5fb 22.06%,
    #eff2fa 36.99%,
    #e6eaf4 68.41%
  )`};
  background-repeat: no-repeat;
  border-radius: 0.8rem;
  cursor: pointer;

  i {
    position: absolute;
    right: 1.4rem;
    bottom: 2rem;
    img {
      width: 100%;
      height: 100%;
    }
  }

  dl {
    padding: 1.6rem;
    dt {
      font-size: 2.2rem;
      color: ${({ select }) => (select ? `#fff` : `#000`)};
      font-weight: 500;
      margin-bottom: 1.2rem;
    }
    dd {
      font-size: 1.6rem;
      line-height: 2.2rem;
      font-weight: 400;
      color: ${({ select }) => (select ? `#fff` : `#838999`)};
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
      <i>
        <img src={img} alt={title} />
      </i>
      <dl>
        <dt>{title}</dt>
        {content}
      </dl>
    </InvitationLinkLi>
  );
};

export default InvitationLinkCard;
