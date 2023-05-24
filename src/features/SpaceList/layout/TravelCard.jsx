import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../../components/Button";
import userImage from "../../../assets/images/userIcon.png";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { getAllPlanList, getRoomData } from "../../Role/AllPlan/allPlanSlice";
import randomImageData from "../../../assets/images/randomImageData";
import { getSidebarData } from "../../layout/Sidebar/sidebarSlice";
const TravelCardWrap = styled.div`
  min-width: 35rem;
  min-height: 48rem;
  background-color: #fff;
  border-radius: 1.5rem;
  overflow: hidden;
`;

const TravelCardHeader = styled.div`
  width: 100%;
  height: 28rem;
  position: relative;
  img.room_img {
    width: 100%;
    height: 100%;
  }
`;

const TravelCardLocation = styled.div`
  position: absolute;
  z-index: 10;
  top: 2rem;
  right: 2rem;
  display: flex;
  gap: 0.4rem;
  align-items: center;
  padding: 0.7rem 1rem;
  background-color: rgba(244, 246, 251, 0.8);
  border-radius: 0.8rem;
  i {
    width: 1.944rem;
    height: 2rem;
    color: #3884fd;
    svg {
      width: 100%;
      height: 100%;
    }
  }
  p {
    color: #3884fd;
    font-size: 1.8rem;
  }
`;

const TravelCardUserIcon = styled.div`
  position: absolute;
  bottom: 2.3rem;
  left: 2rem;
  ul {
    display: flex;
    position: relative;
    li {
      position: absolute;
      width: 4.6rem;
      height: 4.6rem;
      border-radius: 50%;
      overflow: hidden;
      border: 0.3rem solid #f4f6fb;
      img {
        width: 100%;
        height: 100%;
      }
      &:first-child {
        z-index: 10;
      }
      &:nth-child(2) {
        z-index: 9;
        left: 3.7rem;
      }
      &:nth-child(3) {
        z-index: 8;
        left: 7.4rem;
      }
      &:nth-child(4) {
        z-index: 7;
        left: 11.1rem;
      }
      &.plus-members {
        font-size: 1.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #d9d9d9;
        color: #fff;
      }
    }
  }
`;

const TravelCardBody = styled.dl`
  padding: 2rem 2rem;
  margin-top: 1.4rem;
  dl {
    margin-bottom: 1.6rem;
    dt {
      min-height: 5.2rem;
      width: 100%;
      font-size: 2.2rem;
      color: #333;
      margin-bottom: 1.6rem;
    }
    dd {
      font-size: 1.6rem;
      color: #a7a7a7;
    }
  }
`;

const TravelCard = ({
  roomId,
  roomName,
  roomImage,
  startDate,
  endDate,
  location,
  members,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleInRoom = useCallback(() => {
    dispatch(getRoomData(roomId)).then((res) => {
      dispatch(getSidebarData(roomId)).then((res) => {
        dispatch(getAllPlanList(roomId)).then((res) => {
          navigate(`/${roomId}/allplan`);
        });
      });
    });
  }, [dispatch, navigate, roomId]);
  return (
    <TravelCardWrap>
      <TravelCardHeader>
        <img
          className="room_img"
          src={randomImageData[roomImage]}
          alt={roomName}
        />
        <TravelCardLocation>
          <i>
            <HiOutlineLocationMarker />
          </i>
          <p>{location}</p>
        </TravelCardLocation>
        <TravelCardUserIcon>
          <ul>
            {members.length > 4 ? (
              <>
                {members.slice(0, 3).map((member, index) => (
                  <li key={index}>
                    <img
                      src={member.profile === null ? userImage : member.profile}
                      alt={member.name}
                    />
                  </li>
                ))}
                <li className="plus-members">+{members.length - 3}</li>
              </>
            ) : (
              members.map((member, index) => (
                <li key={index}>
                  <img
                    src={member.profile === null ? userImage : member.profile}
                    alt={member.name}
                  />
                </li>
              ))
            )}
          </ul>
        </TravelCardUserIcon>
      </TravelCardHeader>
      <TravelCardBody>
        <dl>
          <dt>{roomName}</dt>
          <dd>
            {startDate} ~ {endDate}
          </dd>
        </dl>
        <Button size="full" color="blue" onClick={handleInRoom}>
          팀 스페이스 입장
        </Button>
      </TravelCardBody>
    </TravelCardWrap>
  );
};

export default TravelCard;
