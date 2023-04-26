import React from "react";
import styled from "styled-components";
import Icons from "../../../../assets/icon/icon";
const BlankWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 60rem;
  font-size: 5rem;

  svg {
    margin-bottom: 3rem;
    color: rgba(193, 217, 254, 1);
  }
`;

const NoticeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 2.2rem;
  font-weight: 550;
  line-height: 3.4rem;
  color: #8b8b8b;
`;

const SmallBlank = ({ classify }) => {
  console.log(classify);
  return (
    <BlankWrapper>
      <Icons.AiOutlineCheckCircle />
      {
        {
          expected: (
            <NoticeWrapper>더 이상 예약이 필요한 항목이 없어요!</NoticeWrapper>
          ),
          Done: (
            <NoticeWrapper>
              예약을 완료했다면 체크를 눌러서 <br /> 완료 항목으로 옮겨보세요.
            </NoticeWrapper>
          ),
        }[classify]
      }
    </BlankWrapper>
  );
};

export default SmallBlank;
