import styled from "styled-components";
import { Link, NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Icons from "../../../assets/icon/icon";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../../assets/images/logo.png";
import { getSidebarData } from "./sidebarSlice";
import randomImageData from "../../../assets/images/randomImageData";
import CustomIcons from "../../../assets/icon/customIcons";

const SidebarWrap = styled.nav`
  width: 24rem;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  box-shadow: 0 0.4rem 2rem 0px rgba(200, 214, 236, 0.7);
  padding: 2rem 3rem;
  overflow: scroll;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SidebarContainer = styled.div``;

const SidebarHeader = styled.div`
  margin-bottom: 4.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    width: 9rem;
    height: 2rem;
    text-decoration: none;
    color: #c4c4c4;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

const SidebarProfile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 4.7rem;
  user-select: none;

  .profile_img {
    width: 14.5rem;
    height: 14.5rem;
    margin-bottom: 3rem;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      overflow: hidden;
      border-radius: 50%;
    }
    .room-edit-btn {
      position: absolute;
      width: 3.5rem;
      height: 3.5rem;
      background-color: #fff;
      box-shadow: 0px 2px 4px rgba(196, 196, 196, 0.25);
      border-radius: 50%;
      z-index: 1;
      right: 0;
      bottom: 1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        width: 2.6rem;
        height: 2.6rem;
        color: #a7a7a7;
      }
    }
  }

  h1 {
    color: #4a4a4a;
    font-size: 2.1rem;
    font-weight: 700;
    margin-bottom: 0.7rem;
  }

  p {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 1.4rem;
    color: #acb1b9;
    cursor: pointer;
    span {
      width: 1.3rem;
      height: 1.3rem;
      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

const Category = styled.div`
  width: 100%;
  margin-bottom: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 0.2rem solid #eeeded;
  p {
    font-size: 1.4rem;
    color: #a9a9a9;
  }
`;

const SideBarNavWrap = styled.div`
  display: flex;
  gap: 2.5rem;
  flex-direction: column;
  &.teamSpaceNav {
    margin-bottom: 4rem;
  }

  a {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: #636363;
    font-size: 1.8rem;
    transition: all 0.3s;
    position: relative;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 2.4rem;
      height: 2.4rem;

      svg {
        width: 100%;
        height: 100%;
      }
    }

    &.active {
      color: #3884fd;
      font-weight: 500;

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 0.5rem;
        height: 0.5rem;
        background-color: #ffc759;
        border-radius: 50%;
      }
    }
  }
`;

const Out = styled.p`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.4rem;
  color: #9e9e9e;
  cursor: pointer;

  i {
    width: 2.4rem;
    height: 2.4rem;
    color: red;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      width: 100%;
      height: 100%;
    }
  }
`;

const SideBarTab = [
  {
    pathname: "모든 여행계획",
    path: "allplan",
    defaultIcon: <CustomIcons.AllPlanGrayIcon />,
    activeIcon: <CustomIcons.AllPlanBlueIcon />,
  },
  {
    pathname: "일정",
    path: "schedule",
    defaultIcon: <CustomIcons.ScheduleGrayIcon />,
    activeIcon: <CustomIcons.ScheduleBlueIcon />,
  },
  {
    pathname: "예약",
    path: "reservation",
    defaultIcon: <CustomIcons.ReservationGrayIcon />,
    activeIcon: <CustomIcons.ReservationBlueIcon />,
  },
  {
    pathname: "회계",
    path: "account",
    defaultIcon: <CustomIcons.AccountingGrayIcon />,
    activeIcon: <CustomIcons.AccountingBlueIcon />,
  },
];

function Sidebar({
  setOpenRoomEditModal,
  setOpenRoomDeleteModal,
  setOpenInvitationModal,
}) {
  const { roomId, role } = useParams();
  const { sidebarData } = useSelector((state) => state.sidebar);
  const { roomName, roomImage, roles } = sidebarData ?? {};
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSidebarData(roomId));
  }, [dispatch, roomId]);

  return (
    <SidebarWrap>
      <SidebarContainer>
        <SidebarHeader>
          <Link to={`/spaceList`}>
            <img src={logo} alt="여행역할로고" />
          </Link>
        </SidebarHeader>

        <SidebarProfile>
          <div className="profile_img">
            <img src={randomImageData[roomImage]} alt={roomName} />
            {roles?.includes("총무") && (
              <div
                className="room-edit-btn"
                onClick={() => setOpenRoomEditModal((prev) => !prev)}
              >
                <CustomIcons.SettingIcon />
              </div>
            )}
          </div>

          <h1>{roomName}</h1>

          {roles?.includes("총무") && (
            <p
              onClick={() => {
                setOpenInvitationModal(true);
              }}
            >
              초대하기
              <span>
                <Icons.HiOutlineLink />
              </span>
            </p>
          )}
        </SidebarProfile>

        <Category>
          <p>팀 스페이스</p>
        </Category>

        <SideBarNavWrap className="teamSpaceNav">
          {SideBarTab.map((item, index) => {
            return (
              <NavLink
                key={index}
                to={`/${roomId}/${item.path}`}
                id={item.path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <span>
                  {item.path === role ? item.activeIcon : item.defaultIcon}
                </span>
                {item.pathname}
              </NavLink>
            );
          })}
        </SideBarNavWrap>

        <Category>
          <p>개인 스페이스</p>
        </Category>

        <SideBarNavWrap>
          <NavLink
            to={`/${roomId}/essentials`}
            className={({ isActive, isPending }) =>
              isPending ? "pending" : isActive ? "active" : ""
            }
            id="essentials"
          >
            <span>
              {role === "essentials" ? (
                <CustomIcons.EssentialBlueIcon />
              ) : (
                <CustomIcons.EssentialGrayIcon />
              )}
            </span>
            준비물
          </NavLink>
        </SideBarNavWrap>
      </SidebarContainer>
      <Out onClick={() => setOpenRoomDeleteModal((prev) => !prev)}>
        <i>
          <CustomIcons.SpaceExitIcon />
        </i>
        스페이스 탈퇴하기
      </Out>
    </SidebarWrap>
  );
}

export default Sidebar;
