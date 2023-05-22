const changeLanCategory = (item) => {
  let category = "";

  switch (item) {
    case "교통":
      category = "traffic";
      break;
    case "숙박":
      category = "accommodation";
      break;
    case "음식":
      category = "food";
      break;
    case "관광":
      category = "tour";
      break;
    case "쇼핑":
      category = "shopping";
      break;
    case "기타":
      category = "etc";
      break;
    case "traffic":
      category = "교통";
      break;
    case "accommodation":
      category = "숙박";
      break;
    case "food":
      category = "음식";
      break;
    case "tour":
      category = "관광";
      break;
    case "shopping":
      category = "쇼핑";
      break;
    case "etc":
      category = "기타";
      break;
    default:
      category = "없음";
  }

  return category;
};

export default changeLanCategory;
