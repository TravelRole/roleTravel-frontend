import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../components/Button";
import travelImage from "../../../assets/images/travelImage.jpeg";
const SpaceWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 40px;
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
  roomId,
  roomName,
  image,
  startDate,
  endDate,
  location,
  members,
}) => {
  const navigate = useNavigate();
  return (
    <SpaceWrap>
      <SpaceTitle>
        <dt>{roomName}</dt>
        <dd>
          <img src={image ? image : travelImage} alt={roomName} />
        </dd>
      </SpaceTitle>
      <SpaceContent>
        <li>
          일자 : {startDate} ~ {endDate}
        </li>
        <li>장소 : {location}</li>
        <li>
          참여자 :
          {members.map(({ name, profile }, index) => (
            <span key={index}> {name}</span>
          ))}
        </li>
        <li>
          <Button
            size="small"
            color="#3884fd"
            onClick={() => navigate(`/${roomId}/allplan`)}
          >
            팀 스페이스 입장
          </Button>
        </li>
      </SpaceContent>
    </SpaceWrap>
  );
};

export default Space;
