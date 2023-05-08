import { Divider, EssentialsSpan, Tip, Title } from "../Styles";

const TitleContent = () => {
  return (
    <Title>
      <h1 style={{ fontSize: "3rem", fontWeight: "600", marginRight: "19px" }}>
        준비물
      </h1>
      <Tip
        // onClick={() => setIsOpen(true)}
        style={{ cursor: "pointer", marginRight: "20px" }}
      >
        TIP&nbsp;!
      </Tip>
      <Divider />
      <EssentialsSpan
        color="#A7A7A7"
        fontWeight="500"
        fontSize="18px"
        style={{ marginLeft: "16px" }}
      >
        TIP 버튼을 눌러 템플릿에서 추가 하거나 추가하기 버튼을 눌러 직접 추가해
        보세요!
      </EssentialsSpan>
    </Title>
  );
};

export default TitleContent;
