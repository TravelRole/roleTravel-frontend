import { useEffect, useState } from "react";
import { Dot, EssentialsItem, EssentialsSpan } from "../Styles";
import Icons from "../../../../assets/icon/icon";

const DeleteCheckBox = ({ item, deleteList, setDeleteList }) => {
  const [checked, setChecked] = useState(false);
  const toggle = () => setChecked(!checked);

  useEffect(() => {
    if (checked) {
      setDeleteList([...deleteList, item.id])
    } else {
      setDeleteList(deleteList.filter((el) => el !== item.id))
    }
  }, [checked]);

  useEffect(() => {
    if (deleteList.length === 0) setChecked(false);
  }, [deleteList])

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        marginTop: "1.6rem"
      }}
    >
      <EssentialsItem>
        {checked ? (
          <Icons.HiOutlineCheckCircle
            size="20"
            style={{
              color: "#3884fd",
              cursor: "pointer",
              strokeWidth: "1.4"
            }}
            onClick={() => toggle()}
          />
        ) : (
          <Dot
            style={{
              background: "#fff",
              border: "0.1rem solid #dadada",
              marginRight: "0.2rem",
              cursor: "pointer"
            }}
            onClick={() => toggle()}
          />
        )}
        <EssentialsSpan
          color="#8b8b8b"
          fontWeight="500"
          fontSize="1.4rem"
          style={{ marginLeft: "1rem" }}
        >
          {item.itemName}
        </EssentialsSpan>
      </EssentialsItem>
    </div>
  );
};

export default DeleteCheckBox;
