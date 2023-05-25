import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Icons from "../../../../../assets/icon/icon";
import AllPlanContentCard from "./AllPlanContentCard";

const AllPlanContentWrap = styled.section``;

const AllPlanContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AllPlanContentHeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  div {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    i {
      width: 3rem;
      height: 3rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #333;
      svg {
        width: 100%;
        height: 100%;
      }
    }
    dl {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      dt {
        font-size: 2.4rem;
        color: #333;
        font-weight: 500;
      }
      dd {
        font-size: 2rem;
        font-weight: 500;
        color: #707070;
      }
    }
  }

  p {
    position: relative;
    font-size: 2rem;
    color: #a7a7a7;

    &::after {
      content: "";
      position: absolute;
      left: -1rem;
      top: 50%;
      transform: translateY(-50%);
      width: 0.2rem;
      height: 1rem;
      background-color: #d8e2f4;
    }
  }
`;

const AllPlanContentHeaderBtns = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  button {
    padding: 0;
    background: none;
    border: none;
    width: 2.7rem;
    height: 2.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #8490a4;
    svg {
      width: 100%;
      height: 100%;
    }

    &:disabled {
      color: #d9d9d9;
    }
  }
`;

const AllPlanContentMain = styled.div`
  margin-top: 2rem;
`;

const AllPlanContentNone = styled.div`
  width: 100%;
  height: 41rem;
  background-color: #eef1f8;
  border-radius: 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 1.5rem;

  i {
    width: 4rem;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #c1d9fe;
    svg {
      width: 100%;
      height: 100%;
    }
  }

  dl {
    dt {
      font-size: 2.6rem;
      color: #333;
      font-weight: 500;
      margin-bottom: 1.5rem;
    }
    dd {
      font-size: 1.8rem;
      color: #8b8b8b;
      font-weight: 400;
      line-height: 2.3rem;
    }
  }
`;

const AllPlanContentSliderWrap = styled.div`
  width: ${({ currentLength }) => `calc(${currentLength} * 29.5rem)`};
`;

const AllPlanContentSlider = styled.div`
  display: flex;
  align-items: baseline;
  gap: 1.5rem;
  transition: transform 0.3s ease-in-out;
`;

const AllPlanContent = () => {
  const { roomData, allPlanList } = useSelector((state) => state.allPlan);
  const { totalExpense, data } = allPlanList ?? {};
  const { startDate, endDate } = roomData ?? {};
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleSlider = useCallback(
    (e) => {
      const { className } = e.currentTarget;
      if (className === "plan-left" && currentSlide > 0) {
        setCurrentSlide((prev) => prev - 1);
      } else if (
        className === "plan-right" &&
        currentSlide < data?.length - 1
      ) {
        setCurrentSlide((prev) => prev + 1);
      }
    },
    [currentSlide, data?.length]
  );
  return (
    <AllPlanContentWrap>
      <AllPlanContentHeader>
        <AllPlanContentHeaderContent>
          <div>
            <i>
              <Icons.HiCalendar />
            </i>
            <dl>
              <dt>전체 일정</dt>
              <dd>
                ({startDate}~{endDate})
              </dd>
            </dl>
          </div>
          <p>총 경비 &#183; {totalExpense}원</p>
        </AllPlanContentHeaderContent>
        <AllPlanContentHeaderBtns>
          <button
            className="plan-left"
            disabled={currentSlide === 0 || data?.length === 0 || data === null}
            onClick={handleSlider}
          >
            <Icons.HiOutlineChevronLeft />
          </button>
          <button
            className="plan-right"
            disabled={
              data?.length === currentSlide + 1 ||
              data?.length === 0 ||
              data === null
            }
            onClick={handleSlider}
          >
            <Icons.HiOutlineChevronRight />
          </button>
        </AllPlanContentHeaderBtns>
      </AllPlanContentHeader>
      <AllPlanContentMain>
        {data?.length === 0 || data === null ? (
          <AllPlanContentNone>
            <i>
              <Icons.RiErrorWarningLine />
            </i>
            <dl>
              <dt>모든 일정이 비어있어요!</dt>
              <dd>
                일정 페이지에서 예약이 필요한 일정을 추가하면
                <br />
                자동으로 예약페이지에 리스트가 생성됩니다 :)
              </dd>
            </dl>
          </AllPlanContentNone>
        ) : (
          <AllPlanContentSliderWrap currentLength={data?.length}>
            <AllPlanContentSlider
              style={{
                transform: `translateX(-${currentSlide * 29.5}rem)`,
              }}
            >
              {data &&
                data?.map((plan, index) => (
                  <AllPlanContentCard key={index} day={index + 1} {...plan} />
                ))}
            </AllPlanContentSlider>
          </AllPlanContentSliderWrap>
        )}
      </AllPlanContentMain>
    </AllPlanContentWrap>
  );
};

export default AllPlanContent;
