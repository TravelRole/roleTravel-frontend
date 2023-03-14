import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
const SidebarContainer = styled.div`
  display: flex;
  width: 200px;
  border: 1px solid black;
  height: 100vh;
  flex-direction: column;
`;

const Ul = styled.ul`
  margin: 0 auto;
`;

const Li = styled.li`
  margin: 25px auto;
  &:hover {
    cursor: pointer;
  }
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
];

function Sidebar({ setRole }) {
  const url = useParams();
  console.log(url.Spacenumber, url.UserId);

  const [num, setNum] = useState(0);
  return (
    <>
      <SidebarContainer>
        <Ul>
          {SideBarTab.map((item, index) => {
            return (
              <Link key={index} to={`/${url.UserId}/${url.Spacenumber}/${item.path}`}>
                <Li >{item.pathname}</Li>
              </Link>
            );
          })}
        </Ul>
        <div>여행목록으로 돌아가기</div>
      </SidebarContainer>
    </>
  );
}

export default Sidebar;
