export const nameValidation = (value) => {
  return {
      success: true,
      error: ''
    }
}


export const dateValidation = (value) => {
  let success = false;
  let error = '';

  const numberReg = /^[0-9/]*$/g;
  const thisYear = new Date().getFullYear();

  if (!numberReg.test(value)) {
      success = false;
      error = '* 숫자 외의 문자는 입력할 수 없습니다.';
  } else if (value.length === 4 && value > thisYear) {
      success = false;
      error = '* 잘못된 형식입니다.';
  } else if (value.length === 7) {
     if (value.substr(5, 2) < 1 || value.substr(5, 2) > 12) {
      success = false;
      error = '* 잘못된 형식입니다.';
    }
  } else if (value.length === 10) {
    if (value.substr(8, 2) < 1 || value.substr(8, 2) > 31) {
      success = false;
      error = '* 잘못된 형식입니다.';
    }
  } else {
    success = true;
    error = '';
  }

  return {
    success: success,
    error: error
  }
}


export const switched = (name, value) => {
  switch (name) {
    case 'name': return nameValidation(value)
    case 'date': return dateValidation(value);
    default: return;
  }
};