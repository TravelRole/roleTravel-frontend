import styled from "styled-components";
import { Link, useParams } from "react-router-dom";

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

function Sidebar() {

  const {UserId , Spacenumber } = useParams();

  return (
    <>
      <SidebarContainer>
        <Ul>
          {SideBarTab.map((item, index) => {
            return (
              <Link
                key={index}
                to={`/${UserId}/${Spacenumber}/${item.path}`}
              >
                <Li>{item.pathname}</Li>
              </Link>
            );
          })}
          <Li>
            <Link to={`/${UserId}/${Spacenumber}/essentials`}>
              준비물
            </Link>
          </Li>
          <Li>
            <Link to={`/${UserId}`}>여행목록 돌아가기</Link>
          </Li>
        </Ul>
      </SidebarContainer>
    </>
  );
}

export default Sidebar;
