import styled from "@emotion/styled";
import dog from "../../../../../assets/images/dog.jpeg";
import React from "react";

const AllPlanMemberCardWrap = styled.div`
  width: 100%;
  max-width: 36rem;
  padding: 1rem 2.5rem 1rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 1rem;

  div {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    i {
      width: 3.4rem;
      height: 3.4rem;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
      }
    }
    dl {
      dt {
        font-size: 1.6rem;
        color: #333;
      }
      dd {
        font-size: 1.2rem;
        color: #a7a7a7;
      }
    }
  }

  ul {
    display: flex;
  }
`;

const AllPlanMemberRole = styled.li`
  font-size: 1.6rem;
  color: ${({ role }) => (role === "총무" ? "#3884fd" : "#53647F")};
`;

const AllPlanMemberCard = ({ name, email, profile, roles }) => {
  const id = email.split("@")[0];

  return (
    <AllPlanMemberCardWrap>
      <div>
        <i>
          <img src={profile === null ? dog : profile} alt={name} />
        </i>
        <dl>
          <dt>{name}</dt>
          <dd>@{id}</dd>
        </dl>
      </div>
      <ul>
        {roles.map((role, i) =>
          i === 0 || i === roles.length ? (
            <AllPlanMemberRole key={i} role={role}>
              {role}
            </AllPlanMemberRole>
          ) : (
            <AllPlanMemberRole key={i} role={role}>
              &#183;{role}
            </AllPlanMemberRole>
          )
        )}
      </ul>
    </AllPlanMemberCardWrap>
  );
};

export default AllPlanMemberCard;
