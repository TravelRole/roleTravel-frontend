import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: #f4f6fb;
  padding-left: 60px;
  padding-top: 80px;

  & > div:nth-child(2) {
    display: flex;
    justify-content: space-between;

    @media screen and (min-width = 1900px) {
      margin-right: 40px;
    }
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 40px;
  margin-left: 20px;
  margin-right: 30px;
`;

export const Tip = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  padding: 6px 9.5px;
  width: 49px;
  height: 27px;
  background: #f4f6fb;
  border: 1px solid #3883fd;
  border-radius: 99px;
  color: #3884fd;

  &:hover {
    background: #3884fd;
    color: white;
  }
`;

export const Row = styled.div`
  width: 100%;
  height: 50px;
  background: #eef1f8;
  mix-blend-mode: normal;
  border-radius: 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;

  & > div {
    font-weight: 500;
    font-size: 18px;
    color: #8490a4;
    border-right: 1px solid #d8e2f4;
    text-align: center;
  }
`;

export const Content = styled.div`
  width: ${(props) => props.width};
  display: flex;
  gap: 10px;
  overflow: hidden;
  margin-left: 20px;
  margin-right: 20px;
`;

export const Section = styled.div`
  width: 260px;
  height: 745px;
  border-radius: 16px;
  background: #eef1f8;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 24px;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 662px;
  background: #ffffff;
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
    color: #8b8b8b;
    line-height: 34px;
  }
`;

export const AddIcon = styled.div`
  border: 4px solid #c1d9fe;
  width: 68px;
  height: 68px;
  border-radius: 100%;
  margin-bottom: 30px;
`;

export const EditContent = styled.div`
  float: right;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px 90px 20px 20px;
`;

export const EssentialsSpan = styled.span`
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
`;

export const Divider = styled.hr`
  border: 1px solid #d8e2f4;
  height: 16px;
  margin-left: 0px;
  margin-right: 0px;
`;

export const Dot = styled.div`
  width: 18px;
  height: 18px;
  background: #c5ccd6;
  border-radius: 100%;
`;

export const EssentialsItem = styled.div`
  display: flex;
  align-items: center;
  height: 46px;
  width: 228px;
  background: #fff;
  border-radius: 8px;
  padding: 14px 10px;
`;
