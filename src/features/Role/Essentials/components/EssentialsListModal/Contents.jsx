import { useEffect, useState } from "react";
import { CheckSpan, Dot, EssentialsModalSpan } from "./Style";
import Icons from "../../../../../assets/icon/icon";
import { IconContext } from "react-icons";
import { materials } from "../../materials";

const Contents = ({
  category,
  itemData,
  list,
  allChecked,
  setAllChecked,
  setList
}) => {
  const [clicked, setClicked] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    if (allChecked) {
      setClicked(true);
      return;
    } else {
      setClicked(false);
      return;
    }
  }, [allChecked]);

  useEffect(() => {
    if (clicked) {
      list[category].push(itemData);
    } else {
      list[category] = list[category]?.filter((el) => el.itemName === itemData);
      setList(list);
    }
    
    if (list[category]?.length === 0) {
      setAllChecked(false);
    }
  }, [clicked, list]);

  const toggle = () => {
    setClicked(!clicked);
  };

  return (
    <div style={{ display: "flex", marginBottom: "10px" }}>
      {clicked ? (
        <IconContext.Provider value={{ color: "#3884fd", size: "16px" }}>
          <Icons.HiCheckCircle
            style={{
              marginRight: "5px",
              cursor: "pointer",
              marginLeft: "-1.5px",
              marginBottom: "-2px"
            }}
            onClick={() => toggle()}
          />
        </IconContext.Provider>
      ) : (
        <Dot
          onClick={() => toggle()}
          clicked={clicked}
        />
      )}
      <CheckSpan clicked={clicked}>{itemData}</CheckSpan>
    </div>
  );
};

export default Contents;