import { useEffect, useState } from "react";
import Icons from "../../../../assets/icon/icon";
import { Dot, EssentialsItem, EssentialsSpan } from "../Styles";

const Checkbox = ({ item, setData }) => {
  const [checked, setChecked] = useState(false);

  // useEffect(() => {
  //   setChecked(item.isChecked)
  // }, [])
  
  // useEffect(() => {
  //   if (checked) {
  //     willDelete.push(item);
  //   } else {
  //     // if (willDelete == )
  //     // setWillDelete(willDelete.filter(el => el.itemName !== item.itemName))
  //   }
  // }, [checked]);

  const toggle = () => setChecked(!checked);

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
              fill: "#eef1f8",
              color: "#3884fd",
              cursor: "pointer",
              strokeWidth: '1.7'
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

export default Checkbox;
