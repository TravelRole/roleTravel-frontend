import React from "react";
import styled from "styled-components";
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  p {
    color: #8b8b8b;
    text-align: center;
    font-weight: 500;
    font-size: 2rem;
    line-height: 3rem;
  }
`;

const SearchBlankPanel = () => {
  return (
    <Wrapper>
      <p>
        가고 싶은 곳을 검색해 <br />
        찜 목록에 추가해 보세요.
        <br />
        <br />
        이 팀 스페이스에 있다면 <br />
        누구나 추가할 수 있답니다 :)
      </p>
    </Wrapper>
  );
};

export default SearchBlankPanel;
