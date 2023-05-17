import { InputAdornment } from "@mui/material";
import { AddEssentialSpan, RowFlex, StyledInput } from "../Styles";
import Icons from "../../../../../../assets/icon/icon";

const AddEssentials = ({
  newList,
  setNewList,
  setNewEssential,
  newEssential
}) => {
  const changeHandler = (event) => {
    const { value } = event.target;
    setNewEssential(value);
  };

  const addHandler = () => {
    if (newEssential === '') return;
    setNewList([...newList, newEssential]);
    setNewEssential("");
  };

  return (
    <>
      <RowFlex style={{ display: "flex", alignItems: "center" }}>
        <StyledInput
          placeholder="준비물을 입력해 보세요."
          endAdornment={
            <InputAdornment
              position="end"
              style={{
                fontSize: "1.2rem",
                fontWeight: "500",
                color: "#a7a7a7"
              }}
            >
              ({newEssential.length}/15)
            </InputAdornment>
          }
          inputProps={{ maxLength: "15" }}
          value={newEssential}
          onChange={changeHandler}
        />
        <Icons.HiOutlinePlusSm
          size="28"
          color="#c4c4c4"
          onClick={() => addHandler()}
          style={{ cursor: "pointer" }}
        />
      </RowFlex>
      <AddEssentialSpan
        color="#49454f"
        fontWeight="400"
        fontSize="1.3rem"
        style={{
          marginTop: "-5px",
          marginLeft: "16px",
          marginBottom: "30px"
        }}
      >
        * 최대 15자까지 입력 가능합니다.
      </AddEssentialSpan>
    </>
  );
};

export default AddEssentials;
