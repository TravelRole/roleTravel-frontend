import styled from "styled-components"

export const Blur = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
`

export const ContentWrapper = styled.div`
  width: 300px;
  height: 410px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 20px;
  z-index: 10;
`

export const Section = styled.section`
  height: ${(props) => props.height};
  width: 100%;
  padding-left: 28px;
  padding-right: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:nth-child(1) > div {
    width: 139px;
    height: 24px;
    display: flex;
    align-items: center;

    & > h1 {
      font-weight: 700;
      font-size: 1.6rem;
      color: #4E4E4E;
      margin-top: 3.5px;
    }
  }

  &:nth-child(3) {
    display: flex;
    align-items: center;
    flex-direction: column;

    & > h1 {
      margin-top: 19.5px;
      width: 251px;
      height: 24px;
      align-self: center;
      font-weight: 400;
      font-size: 1.5rem;
      color: #676767;
      line-height: 150%;
    }

    & > div:nth-child(3) {
      display: flex;
      width: 100%;
      gap: 14px;
    }

    & > div:nth-child(4) {
      width: 251px;
      height: 60px;
      
      & > p {
        list-style-position: inside;
        margin-top: 3px;
        display: list-item;
        font-weight: 400;
        font-size: 1.2rem;
        color: #676767;

        &:nth-child(1) {
          margin-bottom: 10px;
        }
      }
    }
  }
`
export const Profile = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 100%;
  background: #E3E3E3;
  margin-top: -6px;
`

export const Button = styled.button`
  border: 1px solid #ABABAB;
  border-radius: 10px;
  width: 115px;
  height: 36px;
  background: ${(props) => props.backgroundColor};
  font-weight: 400;
  font-size: 13px;
  color: #676767;
  cursor: pointer;
`

export const ButtonFab = styled.div`
  border: 1px solid #ABABAB;
  border-radius: 10px;
  width: 115px;
  height: 36px;
  background: #fff;
  text-align: center;
  align-self: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400;
  color: #676767;
`

export const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 100%;
`