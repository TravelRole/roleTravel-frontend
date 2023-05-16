import styled from "styled-components";
import { Link, NavLink, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import Icons from "../../../assets/icon/icon";
import ProfileImg from "../../../assets/images/image1.jpg";
import { useDispatch } from "react-redux";
import { getInvitationCode } from "../invitationCodeSlice";
import logo from "../../../assets/images/logo.png";
import Menu from "../../../components/Menu";
import RoomEditMenu from "./RoomEditMenu";
import { getRoomData } from "../../Role/AllPlan/allPlanSlice";

const SidebarContainer = styled.nav`
  width: 24rem;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  box-shadow: 0 0.4rem 2rem 0px rgba(200, 214, 236, 0.7);
  padding: 2rem 2rem;

  overflow: scroll;
  z-index: 1;
  &::-webkit-scrollbar {
    display: none;
  }
`;

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
  border-bottom: 2px solid #eeeded;
  p {
    font-size: 1.4rem;
    color: #a9a9a9;
  }
`;

const SideBarNavWrap = styled.div`
  display: flex;
  gap: 3.5rem;
  flex-direction: column;
  &.teamSpaceNav {
    margin-bottom: 6.6rem;
  }

  a {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    color: #636363;
    font-size: 1.8rem;
    transition: all 0.3s;
    position: relative;

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background-color: #f5f5f5;

      svg {
        font-size: 1.8rem;
      }
    }

    &:hover {
      color: #3884fd;
      font-weight: bold;
      span {
        background-color: #e3f0ff;
      }

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

    &.active {
      color: #3884fd;
      font-weight: bold;
      span {
        background-color: #e3f0ff;
      }

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

const Out = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 7rem;
  a {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.4rem;
    color: #9e9e9e;
    /* height: 2.4rem; */
    span {
      width: 2.4rem;
      height: 2.4rem;
      color: red;

      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

const List = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
`;

const SideBarTab = [
  {
    pathname: "모든 여행계획",
    path: "allplan",
    icon: <Icons.SlPlane />,
  },
  {
    pathname: "일정",
    path: "schedule",
    icon: <Icons.RiCalendarCheckLine />,
  },
  {
    pathname: "예약",
    path: "reservation",
    icon: <Icons.HiOutlineTicket />,
  },
  {
    pathname: "회계",
    path: "account",
    icon: <Icons.HiOutlineCalculator />,
  },
];

function Sidebar() {
  const { roomId } = useParams();
  const [active, setActive] = useState(0);
  const [openRoomEditMenu, setOpenRoomEditMenu] = useState(false);
  const dispatch = useDispatch();

  const handleInvitationCode = useCallback(() => {
    dispatch(getInvitationCode(roomId));
  }, [roomId, dispatch]);

  useEffect(() => {
    dispatch(getRoomData(roomId));
  }, [dispatch, roomId]);

  return (
    <>
      <SidebarContainer>
        <SidebarHeader>
          <Link to={`/spaceList`}>
            <img src={logo} alt="여행역할로고" />
          </Link>
        </SidebarHeader>

        <SidebarProfile>
          <div className="profile_img">
            <img src={ProfileImg} alt="noimages" />
            <div
              className="room-edit-btn"
              onClick={() => setOpenRoomEditMenu((prev) => !prev)}
            >
              <Icons.HiOutlineCog />
            </div>
            {openRoomEditMenu && (
              <Menu>
                <RoomEditMenu />
              </Menu>
            )}
          </div>

          <h1>제주도 여행</h1>

          <p onClick={handleInvitationCode}>
            초대하기
            <span>
              <Icons.HiOutlineLink />
            </span>
          </p>
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
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                <span>{item.icon}</span>
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
          >
            <span>
              <Icons.SlBag />
            </span>
            준비물
          </NavLink>
        </SideBarNavWrap>

        <Out>
          <Link>
            <span>
              <Icons.FaDoorOpen />
            </span>
            스페이스 삭제하기
          </Link>
          <Link>
            <span>
              <Icons.FaDoorOpen color="red" />
            </span>
            스페이스 탈퇴하기
          </Link>
        </Out>
      </SidebarContainer>
    </>
  );
}

export default Sidebar;
