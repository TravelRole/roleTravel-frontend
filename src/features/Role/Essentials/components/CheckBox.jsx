import { useState } from "react";
import Icons from "../../../../assets/icon/icon";
import { Dot, EssentialsItem, EssentialsSpan } from "../Styles";

const Checkbox = ({ item }) => {
  const [checked, setChecked] = useState(false);

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
              cursor: "pointer"
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
          {item}
        </EssentialsSpan>
      </EssentialsItem>
    </div>
  );
};

export default Checkbox;
