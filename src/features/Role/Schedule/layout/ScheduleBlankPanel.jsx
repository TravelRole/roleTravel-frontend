import React from 'react';
import styled from 'styled-components';
import Icons from '../../../../assets/icon/icon';

const BlankPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  height: fit-content;
  padding: 2rem 0;

  .headMsg {
    font-weight: 600;
    font-size: 2.6rem;
    margin-bottom: 1.5rem;
  }
  .subMsg {
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 3.4rem;
    color:  #8B8B8B;
  }
`;

const ScheduleBlankPanel = () => {
    return (
        <BlankPanelContainer>
        <Icons.AiOutlineExclamationCircle
          size={40}
          style={{ color: "#C1D9FE" , marginBottom : "1.5rem"}}
        />
        <span className="headMsg">일정 목록이 없습니다!</span>{" "}
        <span className="subMsg">
          장소를 검색해 바로 일정 리스트에 추가하거나
          <br />
          찜한 여행지 목록에서 일정 리스트에 추가해 보세요.
        </span>
      </BlankPanelContainer>
    );
};

export default ScheduleBlankPanel;