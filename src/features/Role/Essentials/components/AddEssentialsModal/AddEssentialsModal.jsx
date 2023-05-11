import { Blur } from "../../../../UserAccount/Modal/Styles";
import { ContentWrapper, EssentialsModalSpan, Section } from "./Style";
import { materials } from "../../materials";
import Cards from "./Cards";
import { useState } from "react";

const AddEssentialsModal = ({ data, setData, setIsOpen }) => {
  const [list, setList] = useState({
    "필수 준비물": [],
    "해외 여행": [],
    의류: [],
    "세면 용품, 화장품": [],
    상비약: [],
    계절용품: [],
    "조리 용품": [],
    "기타 용품": []
  });

  // const addHandler = () => {
  //   setData(list)
  //   console.log(list)
  //   setIsOpen(false)
  // };

  return (
    <>
      <Blur></Blur>
      <ContentWrapper>
        <Section>
          <EssentialsModalSpan
            color="black"
            fontSize="12px"
            fontWeight="300"
            style={{ marginTop: "30px", marginBottom: "19px" }}
          >
            <br />
            마음에 드는 준비물은 클릭해서 여러분의 리스트에 추가해보세요.
          </EssentialsModalSpan>
        </Section>
        <Section>
          {materials
            .filter((_, index) => [0, 1, 2, 3].includes(index))
            .map((el, i) => (
              <Cards
                key={i}
                item={el}
                list={list}
                setList={setList}
                data={data}
              />
            ))}
        </Section>
        <Section>
          {materials
            .filter((_, index) => [4, 5, 6, 7].includes(index))
            .map((el, i) => (
              <Cards
                key={i}
                item={el}
                list={list}
                setList={setList}
                data={data}
              />
            ))}
        </Section>
        <Section>
          {/* <button onClick={addHandler}>추가하기</button> */}
        </Section>
      </ContentWrapper>
    </>
  );
};

export default AddEssentialsModal;
