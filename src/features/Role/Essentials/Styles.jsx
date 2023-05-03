import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: #f4f6fb;
  padding-left: 60px;
  padding-right: 60px;
  padding-top: 80px;

  &: > div:nth-child(2) {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: left;
  gap: 19px;
  margin-bottom: 30px;
`

export const SubTitle = styled.span`
  font-weight: 500;
  font-size: 24px;
  color: ${(props) => props.color}
`

export const Sub = styled.div`
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
`

export const Tip = styled.div`
  font-size: 1.4rem;
  font-wieght: 500;
  padding: 5px 16px;
  width: 61px;
  height: 27px;
  background: #3884fd;
  border-radius: 99px;
  color: white;
`

export const Row = styled.div`
  width: 100%;
  height: 50px;
  background: #EEF1F8;
  mix-blend-mode: normal;
  border-radius: 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  & > div {
    font-weight: 500;
    font-size: 18px;
    color: #8490A4;
    border-right: 1px solid #D8E2F4;
    text-align: center;
  }
`

export const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`

export const Wrapper = styled.div`
  width: 100%;
  height: 662px;
  background: #FFFFFF;
  mix-blend-mode: normal;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > h1 {
    font-weight: 600;
    font-size: 26px;
    color: #333333;
    margin-bottom: 10px;
  }

  & > span {
    font-weight: 500;
    font-size: 22px;
    text-align: center;
    color: #8B8B8B;
    line-height: 34px;
  }
`

export const AddIcon = styled.div`
  border: 4px solid #C1D9FE;
  width: 68px;
  height: 68px;
  border-radius: 100%;
  margin-bottom: 30px;
`