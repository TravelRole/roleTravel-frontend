import React, { useCallback, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import ParentComment from "./ParentComment";
import ChildComment from "./ChildComment";
import { useDispatch, useSelector } from "react-redux";
import { addParentComment, getCommentList } from "../../../commentSlice";
import { useParams } from "react-router-dom";
import AddChildComment from "./AddChildComment";
import { Pagination } from "@mui/material";

const CommentContentWrap = styled.div`
  padding: 0 1.8rem 1.4rem 1.8rem;
  border-radius: 0px 0px 1.6rem 1.6rem;
  background-color: #fff;
  width: 100%;
`;

const CommentContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  /* gap 디자이너 한테 말해서 수정 */
`;

const CommentsWrap = styled.div`
  /* border-bottom: 1px solid #d8e2f4; */
  height: 52.1rem;
  overflow-y: auto;
`;

const AddCommentWrap = styled.form`
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
    p {
      font-size: 1.4rem;
      color: #8b8b8b;
    }
    button {
      border: none;
      background-color: transparent;
      font-size: 1.2rem;
      color: #8b8b8b;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  textarea {
    margin-bottom: 0.5rem;
    width: 100%;
    box-sizing: border-box;
    font-size: 1.6rem;
    padding: 0.8rem;
    color: #707070;
    border: 0.1rem solid #e6e6e6;
    border-radius: 0.8rem;
    outline: none;
    resize: none;
    overflow-y: hidden;

    &::placeholder {
      color: #c4c4c4;
    }
  }

  p {
    text-align: right;
    color: #a7a7a7;
    font-size: 1.2rem;
  }
`;

const CommentContent = ({ openComment }) => {
  const textareaRef = useRef(null);
  const [commentValue, setCommentValue] = useState("");
  const { commentList } = useSelector((state) => state.comment);
  const dispatch = useDispatch();
  const { roomId } = useParams();

  const TEXTAREA_MAX = 100;

  // textarea 높이 자동 조절
  const handleResizeHeight = useCallback(() => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Reset height to auto
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, []);

  // 100자 이내만 작성할 수 있게 해주는 함수
  const onChangeComment = useCallback((e) => {
    const { value } = e.target;
    if (value.length <= TEXTAREA_MAX) {
      setCommentValue(value);
    }
  }, []);

  // 부모 댓글 추가하는 함수
  const onSubmitParentComment = useCallback(
    (e) => {
      e.preventDefault();
      const data = { roomId: roomId, content: commentValue };
      const getData = { roomId: roomId, page: 0 };
      dispatch(addParentComment(data)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          dispatch(getCommentList(getData));
          setCommentValue("");
        }
      });
    },
    [commentValue, dispatch, roomId]
  );

  return (
    <CommentContentWrap>
      <CommentContentContainer>
        <CommentsWrap>
          {commentList &&
            commentList.map((data, index) => (
              <ParentComment key={index} {...data} />
            ))}
        </CommentsWrap>
        <Pagination
          count={3}
          defaultPage={1}
          boundaryCount={3}
          // onChange={(e, page) => handlePage(e, page)}
        />
        <AddCommentWrap onSubmit={onSubmitParentComment}>
          <div>
            <p>의견 작성하기</p>
            <button type="submit">등록</button>
          </div>
          <textarea
            ref={textareaRef}
            placeholder="추가하거나 수정하고 싶은 의견을 작성해주세요"
            rows={1}
            value={commentValue}
            onInput={handleResizeHeight}
            onChange={onChangeComment}
            maxLength={100}
          />
          <p>
            {commentValue.length}/{TEXTAREA_MAX}
          </p>
        </AddCommentWrap>
      </CommentContentContainer>
    </CommentContentWrap>
  );
};

export default CommentContent;
