import MaterialData from "./material";
import { Container, Title, Tip, Sub, SubTitle, Content, Row, Wrapper, AddIcon } from './Styles'

MaterialData.필수준비물[0].checked = true

function Essentials() {
  return (
    <>
      <Container>
        <Title>
          <h1 style={{ fontSize: "3rem", fontWeight: "600" }}>
            준비물
          </h1>
          <Tip>TIP&nbsp;!</Tip>
        </Title>
        <Sub>
          <SubTitle color="#A7A7A7;">가져가야 하는 준비물을 잊지 않도록 여기에 적어보세요:) </SubTitle>
          <SubTitle color="#8490A4">준비물 추가</SubTitle>
        </Sub>
        <Content>
          <Row>
            <div>필수 준비물</div>
            <div>의류</div>
            <div>세면용품</div>
            <div>상비약</div>
            <div>계절 용품</div>
            <div>조리 용품</div>
            <div>기타 용품</div>
          </Row>
        </Content>
      </Container>
    </>
  );
}

export default Essentials;
