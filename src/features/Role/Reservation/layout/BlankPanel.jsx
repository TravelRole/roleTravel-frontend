import React from "react";
import styled from "styled-components";
import Icons from "../../../../assets/icon/icon";
const BlankPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 50rem;

  .headMsg {
    font-weight: 600;
    font-size: 2.6rem;
    margin-bottom: 1.5rem;
  }
  .subMsg {
    font-weight: 500;
    font-size: 2.2rem;
    line-height: 34px;
    color:  #8B8B8B;
  }
`;
const BlankPanel = () => {
  return (
    <BlankPanelContainer>
      <Icons.AiOutlineExclamationCircle
        size={35}
        style={{ color: "#C1D9FE" , marginBottom : "3rem"}}
      />
      <span className="headMsg">예약이 필요한 일정이 없습니다!</span>{" "}
      <span className="subMsg">
        일정 페이지에서 예약이 필요한 일정을 추가하면
        <br />
        자동으로 예약 페이지에 예약 리스트가 생성됩니다 :)
      </span>
    </BlankPanelContainer>
  );
};

export default BlankPanel;
