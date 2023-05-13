import { materials } from "../../../materials";
import { AddEssentialSpan, ButtonList, CategoryButton } from "../Styles";

const Category = ({ clickedCategory, setClickedCategory, setNewEssential, setNewList }) => {
  return (
    <>
      <AddEssentialSpan
        color="#8b8b8b"
        fontWeight="500"
        fontSize="1.4rem"
      >
        카테고리
      </AddEssentialSpan>
      <ButtonList style={{ marginBottom: "20px" }}>
        {materials.map((el) => (
          <CategoryButton
            key={el.category}
            onClick={() => {
              setClickedCategory(el.category);
              setNewEssential("");
              setNewList([]);
            }}
            clicked={clickedCategory === el.category}
          >
            {el.category}
          </CategoryButton>
        ))}
      </ButtonList>
    </>
  );
};

export default Category;
