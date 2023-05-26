import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  padding-left: 6rem;
  padding-top: 8rem;
`;

export const Title = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 4rem;
  margin-left: 2rem;
  margin-right: 3rem;
`;

export const Tip = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
  padding: 0.55rem 1.1rem;
  width: 4.9rem;
  height: 2.7rem;
  background: #f4f6fb;
  border: 0.1rem solid #3883fd;
  border-radius: 9.9rem;
  color: #3884fd;

  &:hover {
    background: #3884fd;
    color: white;
  }
`;

export const Row = styled.div`
  width: 100%;
  height: 5rem;
  background: #eef1f8;
  mix-blend-mode: normal;
  border-radius: 0.8rem;
  display: flex;
  justify-content: space-around;
  align-items: center;

  & > div {
    font-weight: 500;
    font-size: 1.8rem;
    color: #8490a4;
    border-right: 0.1rem solid #d8e2f4;
    text-align: center;
  }
`;

export const Content = styled.div`
  width: ${(props) => props.width};
  display: flex;
  gap: 1rem;
  overflow: hidden;
  margin-left: 2rem;
`;

export const Section = styled.div`
  width: 26rem;
  height: 74.5rem;
  border-radius: 1.6rem;
  background: #eef1f8;
  padding-left: 1.6rem;
  padding-right: 1.6remx;
  padding-top: 2.4rem;
`;

export const Wrapper = styled.div`
  width: 100%;
  height: 66.2rem;
  background: #ffffff;
  mix-blend-mode: normal;
  border-radius: 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > h1 {
    font-weight: 600;
    font-size: 2.6rem;
    color: #333333;
    margin-bottom: 1rem;
  }

  & > span {
    font-weight: 500;
    font-size: 2.2rem;
    text-align: center;
    color: #8b8b8b;
    line-height: 3.4rem;
  }
`;

export const AddIcon = styled.div`
  border: 0.4rem solid #c1d9fe;
  width: 6.8rem;
  height: 6.8rem;
  border-radius: 100%;
  margin-bottom: 3rem;
`;

export const EditContent = styled.div`
  float: right;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0rem 6.8rem 2rem 2rem;
`;

export const EssentialsSpan = styled.span`
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
`;

export const Divider = styled.hr`
  border: 0.1rem solid #d8e2f4;
  height: 1.6rem;
  margin-left: 0rem;
  margin-right: 0rem;
`;

export const Dot = styled.div`
  width: 1.8rem;
  height: 1.8rem;
  background: #c5ccd6;
  border-radius: 100%;
`;

export const EssentialsItem = styled.div`
  display: flex;
  align-items: center;
  height: 4.6rem;
  width: 22.8rem;
  background: #fff;
  border-radius: 0.8rem;
  padding: 1.4rem 1rem;
`;
