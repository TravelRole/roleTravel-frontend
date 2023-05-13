import { useState } from "react";
import Contents from "./Contents";
import {
  AllButton,
  Card,
  CardContent,
  CardHeader,
  EssentialsModalSpan
} from "./Style";
import { useEffect } from "react";
import { materials } from "../../materials";

const Cards = ({ item, setList, list }) => {
  const [allChecked, setAllChecked] = useState(false);

  // useEffect(() => {
  //   const idx = materials.findIndex(el => el.category === item.category)
  //   if (list[item.category].length === materials[idx].items.length) {
  //     setAllChecked(true);
  //   } else {
  //     setAllChecked(false);
  //   }
  // }, [list]);

  const allCheckToggle = () => setAllChecked(!allChecked);

  return (
    <Card>
      <CardHeader>
        <EssentialsModalSpan
          color="black"
          fontSize="1.6rem"
          fontWeight="500"
        >
          {item.category}
        </EssentialsModalSpan>
        <AllButton
          allChecked={allChecked}
          onClick={() => allCheckToggle()}
        >
          전체
        </AllButton>
      </CardHeader>
      <CardContent>
        {item.items.map((itemData, index) => (
          <Contents
            itemData={itemData}
            key={index}
            list={list}
            category={item.category}
            allChecked={allChecked}
            setAllChecked={setAllChecked}
            setList={setList}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default Cards;
