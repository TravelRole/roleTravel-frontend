import React from 'react';
import styled from 'styled-components';
const BlankPanelContainer = styled.div`
    border: 5px solid paleturquoise;
`
const BlankPanel = () => {
    return (
        <BlankPanelContainer>
            예약이 필요한 일정이 없습니다!
            일정 페이지에서 예약이 필요한 일정을 추가하면 자동으로 예약 페이지에 예약 리스트가 생성됩니다 :)
        </BlankPanelContainer>
    );
};

export default BlankPanel;