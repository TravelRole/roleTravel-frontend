import styled from "styled-components";
import { Container } from "../../../components/Container";
import logo from "../../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

const HeaderWrap = styled.header`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    flex: 1;
    font-size: 1.7rem;
    font-weight: bold;
    img {
      width: 30%;
      min-width: 100px;
      cursor: pointer;
    }
  }
  div {
    display: flex;
    justify-content: right;
    flex: 1;
  }
`;


const HeaderSection = () => {
  const navigate = useNavigate();
  
  return (
    <HeaderWrap>
      <Container flex alignCenter justifySpace>
        <h1>
          <img src={logo} alt="여행역할 로고" onClick={() => navigate('/home')} />
        </h1>
        <div></div>
      </Container>
    </HeaderWrap>
  )
}

export default HeaderSection;