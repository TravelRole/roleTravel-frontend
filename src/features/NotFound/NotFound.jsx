import styled from "styled-components";
import NotfoundImage from "../../assets/images/NotFound404.png";

const NotFoundDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100vh;
`;

function NotFound() {
  return (
    <>
      <NotFoundDiv>
        <img
          style={{ width: "519px", height: "419px" }}
          src={NotfoundImage}
          alt="notFound"
        ></img>
      </NotFoundDiv>
    </>
  );
}

export default NotFound;
