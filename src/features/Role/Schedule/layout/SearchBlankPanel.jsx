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

const SearchBlankPanel = ({ filter }) => {
  return (
    <Wrapper>
      {filter === "search" ? (
        <p>
          가고 싶은 곳을 검색해 <br />
          찜 목록에 추가해 보세요.
          <br />
          <br />
          이 팀 스페이스에 있다면 <br />
          누구나 추가할 수 있답니다 :)
        </p>
      ) : (
        <p>
          친구들이 가고 싶다고 찜한 <br />
          장소를 표시하는 곳이에요.
          <br />
          <br />
          검색하기 탭에서 찜 버튼을
          <br />
          눌러 추가해 보세요!
        </p>
      )}
    </Wrapper>
  );
};

export default SearchBlankPanel;
