import { useEffect, useState } from "react";
import Icons from "../../../../assets/icon/icon";
import { Dot, EssentialsItem, EssentialsSpan } from "../Styles";
import { useDispatch } from "react-redux";
import { patchChecks } from "../EssentialsSlice";

const Checkbox = ({ item }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(item.isChecked)
  }, [])

  const toggle = () => {
    setChecked(!checked);
    dispatch(
      patchChecks([
        Number(window.location.href.split("/")[3]),
        {
          check: !checked,
          ids: [item.id]
        }
      ])
    );
  };

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
              fill: "#eef1f8",
              color: "#3884fd",
              cursor: "pointer",
              strokeWidth: "1.7"
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

export default Checkbox;
