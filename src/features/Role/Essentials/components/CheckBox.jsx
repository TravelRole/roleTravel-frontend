import { useEffect, useState } from "react";
import Icons from "../../../../assets/icon/icon";
import { Dot, EssentialsItem, EssentialsSpan } from "../Styles";
import { useDispatch, useSelector } from "react-redux";
import { patchChecks } from "../EssentialsSlice";

const Checkbox = ({ item }) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const { isLoading, check } = useSelector((state) => state.essentials);

  // console.log(isLoading, check)

  useEffect(() => {
    setChecked(item.isChecked)
  }, [])

  const toggle = () => {
    setChecked(!checked);

    dispatch(
      patchChecks([
        Number(window.location.href.split("/")[3]),
        {
          check: checked,
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
              strokeWidth: "1.7"
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
          fontSize="1.4rem"
          style={{ marginLeft: "10px" }}
        >
          {item.itemName}
        </EssentialsSpan>
      </EssentialsItem>
    </div>
  );
};

export default Checkbox;
