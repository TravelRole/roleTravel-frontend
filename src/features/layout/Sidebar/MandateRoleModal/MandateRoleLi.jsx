import React, { useCallback } from "react";
import Icons from "../../../../assets/icon/icon";
import userProfile from "../../../../assets/images/userProfile.png";
import styled from "styled-components";

const MandateRoleLink = styled.li`
  width: 100%;
  padding: 1rem;
  border: ${({ newEmail, email }) =>
    newEmail === email ? ".1rem solid #384ffd" : ".1rem solid #DADADA"};
  border-radius: 0.8rem;
  background-color: ${({ newEmail, email }) =>
    newEmail === email ? "#F4F6FB" : "#fff"};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MandateRoleLinkHeader = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;

  img {
    width: 3.4rem;
    height: 3.4rem;
    border-radius: 50%;
    overflow: hidden;
  }
  dl {
    dt {
      font-size: 1.6rem;
      color: ${({ newEmail, email }) =>
        newEmail === email ? `#3884fd` : `#333`};
      font-weight: 400;
    }
    dd {
      font-size: 1.2rem;
      font-weight: 400;
      color: #a7a7a7;
    }
  }
`;

const MandateRoleLinkContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  ul {
    display: flex;
    align-items: center;
    li {
      font-size: 1.5rem;
      color: ${({ newEmail, email }) =>
        newEmail === email ? `#3884fd` : `#8B8B8B`};
    }
  }
  p {
    width: 2.1rem;
    height: 2.1rem;
    border-radius: 50%;
    border: ${({ newEmail, email }) =>
      newEmail === email ? "none" : ".1rem solid #d9d9d9"};
    background-color: ${({ newEmail, email }) =>
      newEmail === email ? "#3884fd" : "#fff"};
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

const MandateRoleLi = ({
  name,
  email,
  profile,
  roles,
  setNewEmail,
  newEmail,
}) => {
  const onClickRole = useCallback(
    (e) => {
      const { id } = e.target;
      setNewEmail(id);
    },
    [setNewEmail]
  );
  return (
    <MandateRoleLink newEmail={newEmail} email={email}>
      <MandateRoleLinkHeader newEmail={newEmail} email={email}>
        <img src={profile === null ? userProfile : profile} alt={name} />
        <dl>
          <dt>{name}</dt>
          <dd>{email}</dd>
        </dl>
      </MandateRoleLinkHeader>
      <MandateRoleLinkContent newEmail={newEmail} email={email}>
        <ul>
          {roles?.map((role, i) =>
            i === 0 || i === roles.length ? (
              <li key={i}>{role}</li>
            ) : (
              <li key={i}>&middot;{role}</li>
            )
          )}
        </ul>
        <p id={email} onClick={onClickRole}>
          {newEmail === email && (
            <span>
              <Icons.HiCheck />
            </span>
          )}
        </p>
      </MandateRoleLinkContent>
    </MandateRoleLink>
  );
};

export default MandateRoleLi;
