import {
  Blur,
  ContentWrapper,
  Emphasis,
  EssentialsModalSpan,
  ModalButton,
  Section,
  Title
} from "./Style";
import { materials } from "../../materials";
import Cards from "./Cards";
import { useState } from "react";
import { convertCategoryName } from "../AddEssentialsModal/validation";
import { createEssentials } from "../../EssentialsSlice";
import { useDispatch } from "react-redux";

const AddEssentialsModal = ({ data, setData, setIsOpen }) => {
  const dispatch = useDispatch();
  const [list, setList] = useState({
    "필수 준비물": [],
    "의류": [],
    "세면 용품": [],
    "상비약": [],
    "계절용품": [],
    "조리 용품": [],
    "기타 용품": [],
  });

  const addHandler = () => {
    if (Object.values(list).join("") === "") return;
    else {
      Object.keys(list).map(name => {
        if (list[name]?.length > 0) {
          const convert = convertCategoryName(name)
          dispatch(
            createEssentials([
              Number(window.location.href.split("/")[3]),
              {
                category: convert,
                items: list[name]
              }
            ])
          );
        }
      })
      setIsOpen(false);
    }
  };

  return (
    <>
      <Blur></Blur>
      <ContentWrapper>
        <Section height="72px">
          <Title>ROLE</Title>
          <EssentialsModalSpan
            color="#333333"
            fontSize="2.4rem"
            fontWeight="500"
          >
            준비물 챙기기
          </EssentialsModalSpan>
        </Section>
        <Section height="42px">
          <EssentialsModalSpan
            color="#707070"
            fontSize="1.6rem"
            fontWeight="500"
            style={{ lineHeight: "19px", marginBottom: "3px" }}
          >
            여행역할에서 선정한 여행 시 가져가면 좋은 준비물 리스트에요 :)
          </EssentialsModalSpan>
          <EssentialsModalSpan
            color="#707070"
            fontSize="1.6rem"
            fontWeight="500"
            style={{ lineHeight: "19px" }}
          >
            마음에 드는 준비물을 <Emphasis>클릭</Emphasis>해서{" "}
            <Emphasis>리스트에 추가</Emphasis>해 보세요
          </EssentialsModalSpan>
        </Section>
        <Section>
          {Object.keys(materials)
            .filter((_, index) => [0, 1, 2, 3].includes(index))
            .map((el, i) => (
              <Cards
                key={i}
                category={el}
                item={materials[el]}
                list={list}
                setList={setList}
                data={data}
              />
            ))}
        </Section>
        <Section>
          {Object.keys(materials)
            .filter((_, index) => [4, 5, 6].includes(index))
            .map((el, i) => (
              <Cards
                key={i}
                category={el}
                item={materials[el]}
                list={list}
                setList={setList}
                data={data}
              />
            ))}
        </Section>
        <Section height="80px">
          <ModalButton
            color="#333333"
            background="#fff"
            border="1px solid #c4c4c4"
            onClick={() => setIsOpen(false)}
          >
            취소
          </ModalButton>
          <ModalButton
            color="#fff"
            background="#3884fd"
            border="none"
            onClick={() => addHandler()}
          >
            완료
          </ModalButton>
        </Section>
      </ContentWrapper>
    </>
  );
};

export default AddEssentialsModal;
