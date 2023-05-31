import styled from "styled-components";

export const Blur = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: 54.1rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 1.6rem;
  padding-top: 2.6rem;
  z-index: 10;
`;

export const Section = styled.section`
  height: ${(props) => props.height};
  width: 100%;
  padding-left: 2.4rem;
  padding-right: 2.4rem;

  &:nth-child(1) {
    border-bottom: 0.1rem solid #e6e6e6;

    & > h1 {
      font-weight: 500;
      font-size: 2.4rem;
      color: #333333;
      margin-top: -0.5rem;
    }
  }

  &:nth-child(2) {
    margin-top: 1.6rem;
    display: flex;
    flex-direction: column;

    & > h1 {
      font-size: 1.6rem;
      font-weight: 500;
      color: #8b8b8b;
      margin-bottom: 2.8rem;
    }
  }

  &:nth-child(3) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-top: 0.1rem solid #e6e6e6;
  }
`;

export const Explanation = styled.div`
  & > p {
    font-size: 1.4rem;
    font-weight: 400;
    color: #585858;
    line-height: 1.7rem;
    margin-left: 1rem;
  }

  & > p:nth-child(1) {
    margin-bottom: 0.5rem;
  }
`

export const Image = styled.img`
  width: 14.4rem;
  height: 14.4rem;
  border-radius: 100%;
  background: #e3e3e3;
  margin: 0 auto;
  margin-bottom: 3.2rem;
`;

export const Button = styled.button`
  border: 0.1rem solid #dadada;
  border-radius: 0.8rem;
  width: 15rem;
  height: 4.5rem;
  background: ${(props) => props.backgroundColor};
  font-weight: 400;
  font-size: 1.3rem;
  color: #676767;
  cursor: pointer;

  &:hover {
    background: #3884fd;
  }
`;

export const ButtonFab = styled.div`
  border: 0.1rem solid #dadada;
  border-radius: 0.8rem;
  width: 15rem;
  height: 4.5rem;
  background: #fff;
  text-align: center;
  align-self: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: #8b8b8b;
`;

export const Title = styled.span`
  font-family: "Unbounded", cursive;
  font-size: 1.6rem;
  color: #ffc759;
  margin-bottom: 1.4rem;
`;
