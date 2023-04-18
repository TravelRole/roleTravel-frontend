import styled from "styled-components";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Leader from "../Role/Leader";
import Allplan from "../Role/Allplan";
import Reservation from "../Role/Reservation/Reservation";
import Account from "../Role/Account/Account";
import Essentials from "../Role/Essentials/Essentials";
import Schedule from "../Role/Schedule/Schedule";

const TeamSpaceBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: center;
  position: fixed;
  /* border: 5px solid blue; */
`;

const SpaceContainer = styled.div`
  display: flex;
  /* padding: 1rem; */
  width: 100%;
  height: 100%;
  flex-direction: column;
  position: relative;
  background-color: #F5F5F5;
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
              allplan: <Allplan />,
              leader: <Leader />,
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
