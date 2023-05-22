const changeLanCategory = (item) => {
   
  let category = "";

  switch (item) {
    case "교통":
      category = "TRAFFIC";
      break;
    case "숙박":
      category = "ACCOMODATION";
      break;
    case "음식":
      category = "FOOD";
      break;
    case "관광":
      category = "TOUR";
      break;
    case "쇼핑":
      category = "SHOPPING";
      break;
    case "기타":
      category = "ETC";
      break;
    case "TRAFFIC":
      category = "교통";
      break;
    case "ACCOMODATION":
      category = "숙박";
      break;
    case "FOOD":
      category = "음식";
      break;
    case "TOUR":
      category = "관광";
      break;
    case "SHOPPING":
      category = "쇼핑";
      break;
    case "ETC":
      category = "기타";
      break;
    default:
      category = "없음";
  }

  return category;
};

export default changeLanCategory;
