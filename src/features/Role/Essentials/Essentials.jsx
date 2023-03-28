import styled from "styled-components";
import axios from "axios";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  border: 5px solid aqua;
  overflow: ${(props) =>
    props.isAddModal ? "hidden hidden" : "hidden scroll"};

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

function Essentials() {
  return (
    <>
      <Wrapper></Wrapper>
    </>
  );
}

export default Essentials;
