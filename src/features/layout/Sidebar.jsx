import styled from "styled-components";
import { Link, NavLink, useParams } from "react-router-dom";
import { useCallback, useState } from "react";
import Icons from "../../assets/icon/icon";
import ProfileImg from "../../assets/images/image1.jpg";
import { useDispatch } from "react-redux";
import { getInvitationCode } from "./invitationCodeSlice";

const SidebarContainer = styled.nav`
  /* display: flex;
  flex-direction: column; */
  width: 34rem;
  /* height: 100vh; */
  background-color: #ffffff;
  box-shadow: 0 0.4rem 2rem 0px rgba(200, 214, 236, 0.7);
  /* transition: 0.9s; */
  padding: 3.2rem 3rem;
  /* font-size: 1rem; */
  /* color: #9e9e9e; */
  /* z-index: 1; */
  /* @media (max-width: 800px) {
    width: 92px;
  } */
`;

const BacktoList = styled.div`
  margin-bottom: 2.7rem;
  a {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-decoration: none;
    color: #9e9e9e;
    font-size: 1.4rem;
    span {
      color: #9e9e9e;
      font-size: 1.4rem;
    }
  }
`;

const Profile = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 3.7rem;

  .profile_img {
    width: 14.5rem;
    height: 14.5rem;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 3rem;
    img {
      width: 100%;
      height: 100%;
    }
  }

  h1 {
    color: #4a4a4a;
    font-size: 2.1rem;
    font-weight: 700;
    margin-bottom: 0.7rem;
  }

  p {
    cursor: pointer;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    color: #acb1b9;
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
  margin-top: 12rem;
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
  const dispatch = useDispatch();

  const handleInvitationCode = useCallback(() => {
    dispatch(getInvitationCode(roomId));
  }, [roomId, dispatch]);

  return (
    <>
      <SidebarContainer>
        <BacktoList>
          <Link to={`/spaceList`}>
            <span>
              <Icons.HiChevronLeft />
            </span>
            목록으로돌아가기
          </Link>
        </BacktoList>

        <Profile>
          <div className="profile_img">
            <img src={ProfileImg} alt="noimages" />
          </div>
          <h1>제주도 여행</h1>
          <p onClick={handleInvitationCode}>
            초대하기
            <span>
              <Icons.HiOutlineLink />
            </span>
          </p>
        </Profile>

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
