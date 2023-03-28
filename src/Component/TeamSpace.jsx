import styled from "styled-components";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Leader from "../features/Role/Leader";
import Allplan from "../features/Role/Allplan";
import Reservation from "../features/Role/Reservation/Reservation";
import Account from "../features/Role/Account";
import Essentials from "../features/Role/Essentials/Essentials";
import Schedule from "../features/Role/Schedule/Schedule";

const TeamSpaceBox = styled.div`
  display: flex;
  flex-direction: row;
  width:100%;
  height: 100%;
  align-items: center;
  position:fixed;
 
`;

const SpaceContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  position: relative;
  border: 5px solid blue;
`;

function TeamSpace({ Auth }) {
  const navigate = useNavigate();

  const { role } = useParams();

  useEffect(() => {
    if (Auth) {
      console.log(Auth);
      navigate(`/login`);
      return;
    }
  }, []);

  const [reserveList , setReserveList] =useState([]) 

  return (
    <>
      <TeamSpaceBox>
        <Sidebar />
        <SpaceContainer>
          {
            {
              allplan: <Allplan />,
              leader: <Leader />,
              schedule: <Schedule setReserveList={setReserveList}/>,
              reservation: <Reservation reserveList={reserveList}/>,
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
