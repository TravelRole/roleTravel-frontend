import { useState } from "react";
import Contents from "./Contents";
import {
  AllButton,
  Card,
  CardContent,
  CardHeader,
  EssentialsModalSpan
} from "./Style";

const Cards = ({ category, item, setList, list }) => {
  const [allChecked, setAllChecked] = useState(false);

  const allCheckToggle = () => setAllChecked(!allChecked);

  return (
    <Card>
      <CardHeader>
        <EssentialsModalSpan
          color="black"
          fontSize="1.6rem"
          fontWeight="500"
        >
          {category}
        </EssentialsModalSpan>
        <AllButton
          allChecked={allChecked}
          onClick={() => allCheckToggle()}
        >
          전체
        </AllButton>
      </CardHeader>
      <CardContent>
        {item.map((itemData, index) => (
          <Contents
            itemData={itemData}
            key={index}
            list={list}
            category={category}
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
