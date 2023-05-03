import React from "react";
import styled from "styled-components";

const AllPlanCommentWrap = styled.div`
  flex: 1;
  background-color: blue;
  max-width: 43rem;
`;

const AllPlanComment = () => {
  return (
    <AllPlanCommentWrap>
      <p>댓글쪽</p>
    </AllPlanCommentWrap>
  );
};

export default AllPlanComment;
