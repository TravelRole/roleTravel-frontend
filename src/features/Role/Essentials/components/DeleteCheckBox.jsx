import { useEffect, useState } from "react";
import { Dot, EssentialsItem, EssentialsSpan } from "../Styles";
import Icons from "../../../../assets/icon/icon";

const DeleteCheckBox = ({ item, deleteList, setDeleteList }) => {
  const [checked, setChecked] = useState(false);
  const toggle = () => setChecked(!checked);

  useEffect(() => {
    if (checked) {
      deleteList.push(item.id)
    } else {
      setDeleteList(deleteList.filter((el) => el !== item.id))
    }
  }, [checked]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
        marginTop: "16px"
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
              border: "1px solid #dadada",
              marginRight: "2px",
              cursor: "pointer"
            }}
            onClick={() => toggle()}
          />
        )}
        <EssentialsSpan
          color="#8b8b8b"
          fontWeight="500"
          fontSize="14px"
          style={{ marginLeft: "10px" }}
        >
          {item.itemName}
        </EssentialsSpan>
      </EssentialsItem>
    </div>
  );
};

export default DeleteCheckBox;
