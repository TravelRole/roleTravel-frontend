import Icons from "../../../../../../assets/icon/icon";
import {
  AddEssentialSpan,
  ButtonList,
  CategoryButton,
  ColumnFlex
} from "../Styles";
import AddEssentials from "./AddEssentials";

const Form = ({
  clickedCategory,
  newList,
  setNewList,
  setNewEssential,
  newEssential
}) => {
  const deleteHandler = (name) => {
    setNewList(newList.filter((el) => el !== name));
  };

  return (
    <ColumnFlex gap="10px">
      <AddEssentialSpan
        color="#8b8b8b"
        fontWeight="500"
        fontSize="1.4rem"
      >
        준비물
      </AddEssentialSpan>
      {clickedCategory === "" ? (
        <AddEssentialSpan
          color="#a7a7a7"
          fontWeight="500"
          fontSize="1.6rem"
        >
          카테고리 선택 후 입력해주세요.
        </AddEssentialSpan>
      ) : (
        <>
          <AddEssentials
            newList={newList}
            setNewList={setNewList}
            setNewEssential={setNewEssential}
            newEssential={newEssential}
          />
          {Object.values(newList).join("").length !== 0 && (
            <ButtonList style={{ marginBottom: "20px", marginTop: "-20px" }}>
              {newList.map((v, index) => {
                return (
                  <CategoryButton
                    key={index}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {v}
                    <Icons.MdOutlineClose
                      size="14px"
                      style={{
                        marginLeft: "10px",
                        color: "#a7a7a7"
                      }}
                      onClick={() => deleteHandler(v)}
                    />
                  </CategoryButton>
                );
              })}
            </ButtonList>
          )}
        </>
      )}
    </ColumnFlex>
  );
};

export default Form;
