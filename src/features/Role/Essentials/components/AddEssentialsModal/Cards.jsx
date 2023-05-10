import Contents from "./Contents";
import { Card, CardContent, EssentialsModalSpan } from "./Style";

const Cards = ({ item, setList, list, data }) => {

  return (
    <Card>
      <EssentialsModalSpan
        color="black"
        fontSize="12px"
        fontWeight="700"
        style={{ marginBottom: "18px", textAlign: "center" }}
      >
        {item.category}
      </EssentialsModalSpan>
      <CardContent>
        {item.items.map((itemData, index) => (
          <Contents
            itemData={itemData}
            key={index}
            list={list}
            data={data}
            category={item.category}
            setList={setList}
          />
        ))}
      </CardContent>
      <EssentialsModalSpan
        fontSize="10px"
        fontWeight="300"
        color="black"
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        전체 선택
      </EssentialsModalSpan>
    </Card>
  );
};

export default Cards;
