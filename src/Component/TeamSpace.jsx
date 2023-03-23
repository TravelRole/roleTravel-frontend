import styled from "styled-components";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Leader from "../features/Role/Leader";
import Allplan from "../features/Role/Allplan";
import Reservation from "../features/Role/Reservation";
import Account from "../features/Role/Account";
import Essentials from "../features/Role/Essentials";
import Schedule from "../features/Role/Schedule/Schedule";

const TeamSpaceBox = styled.div`
  display: flex;
  flex-direction: row;
  width:100%
  height: 100vh;
  align-items: center;
 
`;

const SpaceContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
 
  border : 5px solid blue;
  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #cdcdf4;
  }
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

  return (
    <>
      <TeamSpaceBox>
        <Sidebar />
        <SpaceContainer>
          {
            {
              allplan: <Allplan />,
              leader: <Leader />,
              schedule: <Schedule />,
              reservation: <Reservation />,
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
