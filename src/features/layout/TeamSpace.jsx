import styled from "styled-components";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Reservation from "../Role/Reservation/Reservation";
import Account from "../Role/Account/Account";
import Essentials from "../Role/Essentials/Essentials";
import Schedule from "../Role/Schedule/Schedule";
import AllPlan from "../Role/Allplan/AllPlan";

const TeamSpaceBox = styled.div`
  display: flex;
  /* width: 100%; */
  height: 100vh;
  align-items: center;
`;

const SpaceContainer = styled.div`
  display: flex;
  /* padding: 1rem; */
  width: 100%;
  height: 100%;
  flex-direction: column;
  position: relative;
  background-color: #f5f5f5;
  /* border: 5px solid blue; */
`;

function TeamSpace({ Auth }) {
  // const navigate = useNavigate();

  const { role } = useParams();

  // useEffect(() => {
  //   if (Auth) {
  //     console.log(Auth);
  //     navigate(`/login`);
  //     return;
  //   }
  // }, []);

  const [reserveList, setReserveList] = useState([]);

  return (
    <>
      <TeamSpaceBox>
        <Sidebar />
        <SpaceContainer>
          {
            {
              allplan: <AllPlan />,
              schedule: <Schedule setReserveList={setReserveList} />,
              reservation: <Reservation reserveList={reserveList} />,
              account: <Account />,
              essentials: <Essentials />,
            }[role]
          }
        </SpaceContainer>
      </TeamSpaceBox>
    </>
  );
}

export default TeamSpace;
