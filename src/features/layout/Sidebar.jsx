import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Icons from "../../assets/icon/icon";
import ProfileImg from "../../assets/images/image1.jpg";

const SidebarContainer = styled.nav`
  display: flex;
  flex-direction: column;
  width: 20rem;
  height: 100vh;
  background-color: #ffffff;
  box-shadow: 0 4px 20px 0px rgba(200, 214, 236 , 0.7);
  transition: 0.9s;
  padding: 1.375rem 1.875rem;
  font-size: 1rem;
  color: #9e9e9e;
  z-index: 1;
  /* @media (max-width: 800px) {
    width: 92px;
  } */
`;

const BacktoList = styled.div`
  color: #9e9e9e;
  height: 3rem;
  display: flex;
  align-items: center;

  a {
    text-decoration: none;
    color: gray;
    div {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
`;

const Profile = styled.div`
  width: 100%;
  height: 15rem;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 9rem;
    height: 9rem;
    border-radius: 50%;
  }

  h1 {
    color: black;
    font-size: 1.25rem;
    font-weight: bold;
    margin-top: 1.3rem;
  }
`;

const InviteLink = styled.div`
  margin: 0.5rem;
  margin-left: 0.7rem;
  font-size: 0.8rem;
`;

const Category = styled.div`
  width: 100%;
  font-size: 0.9rem;
  padding: 0.3rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  hr {
    width: 100%;
    border: 1px solid gray;
  }
`;

const SmallTitle = styled.div`
  font-size: 0.9rem;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Ul = styled.ul`
  /* height: 100%; */
  display: flex;
  flex-direction: column;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 1rem;
  color: black;
  padding: 0.5rem;
  border-radius: 0.5rem;
  position: relative;

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
    background-color: ${(props) => (props.actived ? "#E3F0FF" : "#f5f5f5")};
    border-radius: 50%;
    width: 1.7rem;
    height: 1.7rem;
  }

  .yellowDot {
    width: 0.3rem;
    height: 0.3rem;
    background-color: ${(props) => (props.actived ? "#FFC759" : "#f5f5f5")};
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 5px;
  }

  &:hover {
    cursor: pointer;
    .icon {
      background-color: #e3f0ff;
    }
    .yellowDot {
      background-color: #ffc759;
    }
  }

  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Out = styled.div`
  position: absolute;
  bottom: 1.375rem;
  li {
    width: 100%;
    margin: 0;

    .yellowDot {
      display: none;
    }
  }
`;

const List = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SideBarTab = [
  {
    pathname: "모든여행계획",
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
  const { UserId, Spacenumber } = useParams();
  const [active, setActive] = useState(0);
  return (
    <>
      <SidebarContainer>
        <BacktoList>
          <Link to={`/${UserId}`}>
            <div>
              <div>
                <Icons.HiChevronLeft />
              </div>
              목록으로돌아가기
            </div>
          </Link>
        </BacktoList>

        <Profile>
          <div>
            <img src={ProfileImg} alt="noimages"></img>
          </div>
          <h1>제주도 여행</h1>
          <div>
            <InviteLink>
              <span>초대하기</span>
              <Icons.HiOutlineLink />
            </InviteLink>
          </div>
        </Profile>

        <Category>
          <SmallTitle>팀스페이스</SmallTitle>
          <hr />
        </Category>

        <Ul>
          {SideBarTab.map((item, index) => {
            return (
              <Link key={index} to={`/${Spacenumber}/${item.path}`}>
                <Li
                  onClick={() => setActive(index)}
                  actived={active === index ? true : false}
                >
                  <div className="icon">{item.icon}</div>
                  <List>{item.pathname}</List>
                  <div className="yellowDot"></div>
                </Li>
              </Link>
            );
          })}
        </Ul>

        <Category>
          <SmallTitle>개인 스페이스</SmallTitle>
          <hr />
        </Category>

        <Link to={`/${Spacenumber}/essentials`}>
          <Li>
            <div className="icon">
              <Icons.SlBag />
            </div>
            <List>준비물</List>
            <div className="yellowDot"></div>
          </Li>
        </Link>

        <Out>
          <Link>
            <Li>
              <div className="icon">
                <Icons.FaDoorOpen color="red" />
              </div>
              <List>스페이스 삭제하기</List>
              <div className="yellowDot"></div>
            </Li>
          </Link>
          <Link>
            <Li>
              <div className="icon">
                <Icons.FaDoorOpen color="red" />
              </div>
              <List>스페이스 나가기</List>
              <div className="yellowDot"></div>
            </Li>
          </Link>
        </Out>
      </SidebarContainer>
    </>
  );
}

export default Sidebar;
