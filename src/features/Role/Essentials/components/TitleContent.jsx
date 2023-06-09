import { useState } from "react";
import { Divider, EssentialsSpan, Tip, Title } from "../Styles";
import EssentialsListModal from "../components/EssentialsListModal/EssentialsListModal";

const TitleContent = ({ setData }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {isOpen && (
        <EssentialsListModal setIsOpen={setIsOpen} setData={setData} />
      )}
      <Title>
        <h1
          style={{ fontSize: "3rem", fontWeight: "600", marginRight: "1.9rem" }}
        >
          준비물
        </h1>
        <Tip
          onClick={() => setIsOpen(true)}
          style={{ cursor: "pointer", marginRight: "2rem" }}
        >
          TIP!
        </Tip>
        <Divider />
        <EssentialsSpan
          color="#A7A7A7"
          fontWeight="500"
          fontSize="1.8rem"
          style={{ marginLeft: "1.6rem" }}
        >
          TIP 버튼을 눌러 템플릿에서 추가 하거나 추가하기 버튼을 눌러 직접
          추가해 보세요!
        </EssentialsSpan>
      </Title>
    </>
  );
};

export default TitleContent;
