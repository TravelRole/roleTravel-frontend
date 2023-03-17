import React from "react";
import styled from "styled-components";
import Button from "../../../components/Button";

const SpaceWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const SpaceTitle = styled.dl`
  flex: 0.5;
  dt {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 20px;
  }
  dd {
    width: 100%;
    border-radius: 20px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
`;

const SpaceContent = styled.ul`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Space = ({
  id,
  title,
  image,
  startDate,
  lastDate,
  location,
  members,
}) => {
  return (
    <SpaceWrap>
      <SpaceTitle>
        <dt>{title}</dt>
        <dd>
          <img src={image} alt={title} />
        </dd>
      </SpaceTitle>
      <SpaceContent>
        <li>
          일자 : {startDate} ~ {lastDate}
        </li>
        <li>장소 : {location}</li>
        <li>
          참여자 :
          {members.map((member, index) => (
            <span key={index}> {member}</span>
          ))}
        </li>
        <li>
          <Button size="small" color="#3884fd">
            팀 스페이스 입장
          </Button>
        </li>
      </SpaceContent>
    </SpaceWrap>
  );
};

export default Space;
