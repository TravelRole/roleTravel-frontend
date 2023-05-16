import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Reservation from "../Role/Reservation/Reservation";
import Account from "../Role/Account/Account";
import Essentials from "../Role/Essentials/Essentials";
import Schedule from "../Role/Schedule/Schedule";
import AllPlan from "../Role/AllPlan/AllPlan";
import Sidebar from "./Sidebar/Sidebar";
import { useDispatch } from "react-redux";
import { getAllPlanList, getRoomData } from "../Role/AllPlan/allPlanSlice";
import { getUserInfo } from "../Landing/userSlice";

const TeamSpaceBox = styled.div`
  display: flex;
`;

const SpaceContainer = styled.div`
  overflow-x: hidden;
  height: 100vh;
  flex: 2;
  display: flex;
  flex-direction: column;
  padding-left: 24rem;
  background-color: #f5f5f5;
`;

function TeamSpace({ Auth }) {
  // const navigate = useNavigate();

  const [reserveList, setReserveList] = useState([]);
  const { role } = useParams();

  // useEffect(() => {
  //   // if (Auth) {
  //   //   console.log(Auth);
  //   //   navigate(`/login`);
  //   //   return;
  //   // }
  // }, [dispatch, roomId]);

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
