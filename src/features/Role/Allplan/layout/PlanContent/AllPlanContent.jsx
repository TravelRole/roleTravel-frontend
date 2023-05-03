import React from "react";
import styled from "styled-components";

const AllPlanContentWrap = styled.div`
  flex: 2;
  min-width: 104rem;
`;

const AllPlanContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const AllPlanContentHeader = styled.dl`
  width: 100%;
  padding: 3.5rem 2.5rem;
  background-color: #fff;
  border-radius: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  dt {
    font-size: 3.4rem;
    font-weight: 600;
    color: #2e3846;
  }
  dd {
    font-size: 1.8rem;
    font-weight: 500;
    color: #8492a4;
  }
`;

const AllPlanContentMain = styled.div`
  width: 100%;
  padding: 3.5rem 2.5rem;
  background-color: #fff;
  border-radius: 1.6rem;

  dl {
    display: flex;
    gap: 2.2rem;
    align-items: center;
    dt {
      position: relative;
      display: flex;
      align-items: center;
      font-size: 2.6rem;
      font-weight: 500;
      color: #69778f;
      span {
        font-size: 2rem;
        font-weight: 400;
        color: #8490a4;
        margin-left: 1rem;
      }

      &::after {
        content: "";
        position: absolute;
        top: 50%;
        right: -1.1rem;
        transform: translateY(-50%);
        width: 0.2rem;
        height: 1rem;
        background-color: #d8e2f4;
      }
    }
    /* 43.68 */
    dd {
      font-size: 2rem;
      color: #adb5c2;
    }
  }
`;

const AllPlanContent = () => {
  return (
    <AllPlanContentWrap>
      <AllPlanContentContainer>
        <AllPlanContentHeader>
          <dt>제주도 서귀포시</dt>
          <dd>2023/04/17 ~ 2023/04.21</dd>
        </AllPlanContentHeader>

        <AllPlanContentMain>
          <dl>
            <dt>
              전체 일정<span>(23/04/17 ~ 23/04/21)</span>
            </dt>
            <dd>총 경비 &middot; 1,230,000원 </dd>
          </dl>
        </AllPlanContentMain>
      </AllPlanContentContainer>
    </AllPlanContentWrap>
  );
};

export default AllPlanContent;
