export const nameValidation = (value) => {
  return {
    success: true,
    error: ""
  };
};

export const dateValidation = (value) => {
  let success = false;
  let error = "";

  const numberReg = /^[0-9/]*$/g;

  if (!numberReg.test(value)) {
    success = false;
    error = "* 숫자 외의 문자는 입력할 수 없습니다.";
  } else if (value.length > 2 && (!["1", "2"].includes(value[0]))) {
    success = false;
    error = "* 잘못된 날짜 형식입니다.";
  } else if (value.length > 2 && !["9", "0"].includes(value[1])) {
    success = false;
    error = "* 잘못된 날짜 형식입니다.";
  } else if (value.length > 5 && !["0", "1"].includes(value[5])) {
    success = false;
    error = "* 잘못된 날짜 형식입니다.";
  } else if (
    value.length > 6 &&
    (Number(value.slice(5, 7)) > 12 || Number(value.slice(5, 7)) < 1)
  ) {
    success = false;
    error = "* 잘못된 날짜 형식입니다.";
  } else if (
    value.length > 8 &&
    !["1", "3", "5", "7", "8", "10", "12"].includes(
      Number(value.slice(5, 7))
    ) &&
    (Number(value.slice(8, 10)) > 31 || Number(value.slice(8, 10)) < 1)
  ) {
    success = false;
    error = "* 잘못된 날짜 형식입니다.";
  } else if (
    value.length > 8 &&
    !["4", "6", "9", "11"].includes(Number(value.slice(5, 7))) &&
    (Number(value.slice(8, 10)) > 30 || Number(value.slice(8, 10)) < 1)
  ) {
    success = false;
    error = "* 잘못된 날짜 형식입니다.";
  } else if (
    value.length > 8 &&
    !["2"].includes(Number(value.slice(5, 7))) &&
    (Number(value.slice(8, 10)) > 29 || Number(value.slice(8, 10)) < 1)
  ) {
    success = false;
    error = "* 잘못된 날짜 형식입니다.";
  } else {
    success = true;
    error = "";
  }

  return {
    success: success,
    error: error
  };
};

export const switched = (name, value) => {
  if (name === "nickname") return nameValidation(value);
  else if (name === "date") return dateValidation(value);
};
