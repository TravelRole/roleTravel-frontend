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
      <ButtonList style={{ marginBottom: "2rem" }}>
        {Object.keys(materials)?.map((category) => (
          <CategoryButton
            key={category}
            onClick={() => {
              setClickedCategory(category);
              setNewEssential("");
              setNewList([]);
            }}
            clicked={clickedCategory === category}
          >
            {category}
          </CategoryButton>
        ))}
      </ButtonList>
    </>
  );
};

export default Category;
