import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 230px;
  height: 100vh;
  background-color: #12192c;
  transition: 0.9s;
  padding: 1.5rem 1.5rem 2rem;

  @media (max-width: 800px) {
    width: 92px;
  }
`;

const Ul = styled.ul`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Li = styled.li`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  color: white;
  padding: 0.75rem;
  border-radius: 0.5rem;
  transition: 0.1s;
  overflow: hidden;
  white-space: nowrap;
  -ms-text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  background-color: ${(props) => (props.actived ? "#3884fd" : null)};

  &:hover {
    cursor: pointer;
    background-color: #3884fd;
  }

  @media (max-width: 800px) {
    color: red;
    width: 100%;
  }
`;
const Icon = styled.div`
  display: flex;
  padding-right: 0.75rem;
`;

const List = styled.span`
  height: 20px;
  display: block;
  align-items: center;
  justify-content: center;
`;

const SideBarTab = [
  {
    pathname: "모든여행계획",
    path: "allplan",
  },
  {
    pathname: "총무",
    path: "leader",
  },
  {
    pathname: "일정",
    path: "schedule",
  },
  {
    pathname: "예약",
    path: "reservation",
  },
  {
    pathname: "회계",
    path: "account",
  },
  {
    pathname: "준비물",
    path: "essentials",
  },
];

function Sidebar() {
  const { UserId, Spacenumber } = useParams();
  const [active, setActive] = useState(0);
  return (
    <>
      <SidebarContainer>
        <Ul>
          {SideBarTab.map((item, index) => {
            return (
              <Link key={index} to={`/${UserId}/${Spacenumber}/${item.path}`}>
                <Li
                  onClick={() => setActive(index)}
                  actived={active === index ? true : false}
                >
                  <Icon>🌈</Icon>
                  <List>{item.pathname}</List>
                </Li>
              </Link>
            );
          })}

          <Link to={`/${UserId}`}>
            <Li>여행목록 돌아가기</Li>
          </Link>
        </Ul>
      </SidebarContainer>
    </>
  );
}

export default Sidebar;
