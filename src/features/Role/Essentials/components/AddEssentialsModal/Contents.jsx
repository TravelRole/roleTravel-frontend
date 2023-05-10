import { useEffect, useState } from "react";
import { Dot, EssentialsModalSpan } from "./Style";

const Contents = ({ category, itemData, setList, list, data }) => {
  const [clicked, setClicked] = useState(false);
  const [id, setId] = useState(0)

  useEffect(() => {
    if (clicked) {
      setId(id + 1)
      list[category].push({
        id: id,
        itemName: itemData,
        isChecked: true
      });
    } else {
      if (list[category].length === 1) list[category] = []
      else list[category] = list[category].filter(el => el.itemName !== itemData)
    }
  }, [clicked]);

  const toggle = () => {
    setClicked(!clicked);
  };

  return (
    <div style={{ display: "flex", marginBottom: "17px" }}>
      <Dot
        onClick={() => toggle()}
        clicked={clicked}
      />
      <EssentialsModalSpan
        color="black"
        fontSize="10px"
        fontWeight="300"
      >
        {itemData}
      </EssentialsModalSpan>
    </div>
  );
};

export default Contents;
