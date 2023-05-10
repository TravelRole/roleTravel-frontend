import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { HiOutlineChat, HiChevronDown } from "react-icons/hi";
import CommentContent from "./CommentContent";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getCommentList } from "../../../commentSlice";

const AllPlanCommentWrap = styled.div`
  flex: 1;
  position: relative;
`;

const AllPlanCommentContainer = styled.div`
  position: ${({ openComment }) => (openComment ? "absolute" : "relative")};
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  border-radius: 1.6rem;
  background-color: #fff;
`;

const AllPlanCommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.8rem;
  cursor: pointer;

  p {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.8rem;
    color: #4a5568;
    font-weight: 500;

    span {
      width: 3rem;
      height: 3rem;
      svg {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        color: #3884fd;
        font-size: 2.5rem;
      }
    }
  }

  i {
    width: 3rem;
    height: 3rem;
    svg {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: #3884fd;
      font-size: 3rem;
    }
  }
`;

const CommentWrap = () => {
  const [openComment, setOpenComment] = useState(false);
  const dispatch = useDispatch();
  const { roomId } = useParams();

  useEffect(() => {
    const data = { roomId: roomId, page: 0 };
    dispatch(getCommentList(data));
  }, [dispatch, roomId]);
  return (
    <AllPlanCommentWrap>
      <AllPlanCommentContainer openComment={openComment}>
        <AllPlanCommentHeader
          openComment={openComment}
          onClick={() => setOpenComment((prev) => !prev)}
        >
          <p>
            <span>
              <HiOutlineChat />
            </span>
            의견 (Comment)
          </p>
          <i>
            <HiChevronDown />
          </i>
        </AllPlanCommentHeader>
        {openComment && <CommentContent openComment={openComment} />}
      </AllPlanCommentContainer>
    </AllPlanCommentWrap>
  );
};

export default CommentWrap;
