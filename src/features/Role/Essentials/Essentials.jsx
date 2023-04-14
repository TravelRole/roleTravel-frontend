import styled from "styled-components";
import axios from "axios";
import MaterialData from "./material";
import Material from "./material";

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

const MaterialWrapper = styled.div`
  width: 100%;
  height: fit-content;
  border: 2px solid orange;
  display : flex;
  flex-direction:row;
  /* overflow:scroll; */
`;

const Category = styled.div`
flex : 1;
  display: flex;
  flex-direction: column;
  border : 2px solid black;
`;

MaterialData.필수준비물[0].checked = true

function Essentials() {
  return (
    <>
      <Wrapper>
        <h1 style={{ fontSize: "25px", margin: "1rem", fontWeight: "bold" }}>
          준비물 : 개인스페이스
        </h1>
        <MaterialWrapper>
          <Category>
            <h2>필수준비물</h2>
            {MaterialData.필수준비물.map((item) => {
              console.log(item.checked)
              return <div style={{ margin: "0.5rem" }}>{item.material}</div>
            })}
          </Category>
          <Category>
            <h2>해외여행</h2>
            {MaterialData.해외여행.map((item) => (
              <div style={{ margin: "0.5rem" }}>{item.material}</div>
            ))}
          </Category>
          <Category>
            <h2>의류</h2>
            {MaterialData.의류.map((item) => (
              <div style={{ margin: "0.5rem" }}>{item.material}</div>
            ))}
          </Category>

          <Category>
            <h2>세면용품, 화장품</h2>
            {MaterialData["세면용품, 화장품"].map((item) => (
              <div style={{ margin: "0.5rem" }}>{item.material}</div>
            ))}
          </Category>
          <Category>
            <h2>상비약</h2>
            {MaterialData.상비약.map((item) => (
              <div style={{ margin: "0.5rem" }}>{item.material}</div>
            ))}
          </Category>
          <Category>
            <h2>계절용품</h2>
            {MaterialData.계절용품.map((item) => (
              <div style={{ margin: "0.5rem" }}>{item.material}</div>
            ))}
          </Category>
          <Category>
            <h2>조리용품</h2>
            {MaterialData.조리용품.map((item) => (
              <div style={{ margin: "0.5rem" }}>{item.material}</div>
            ))}
          </Category>
          <Category>
            <h2>기타용품</h2>
            {MaterialData.기타용품.map((item) => (
              <div style={{ margin: "0.5rem" }}>{item.material}</div>
            ))}
          </Category>
        </MaterialWrapper>
      </Wrapper>
    </>
  );
}

export default Essentials;
