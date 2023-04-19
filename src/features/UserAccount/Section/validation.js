export const nameValidation = (value) => {
  return {
      success: true,
      error: ''
    }
}


export const dateValidation = (value) => {
  const numberReg = /^[0-9/]*$/g;
  if (!numberReg.test(value)) {
    return {
      success: false,
      error: '* 숫자 외의 문자는 입력할 수 없습니다.'
    }
  } else if (value.length === 4) {
    let thisYear = new Date().getFullYear();
    if (value > thisYear) {
      return {
        success: false,
        error: '* 잘못된 형식입니다.'
      }
    } else {
      return {
        success: true,
        error: ''
      }
    }
  } else if (value.length === 7) {
     if (value.substr(5, 2) < 1 || value.substr(5, 2) > 12) {
      return {
        success: false,
        error: '* 잘못된 형식입니다.'
      }
    } else {
      return {
        success: true,
        error: ''
      }
    }
  } else if (value.length === 10) {
    if (value.substr(8, 2) < 1 || value.substr(8, 2) > 31) {
      return {
        success: false,
        error: '* 잘못된 형식입니다.'
      }
    } else {
      return {
        success: true,
        error: ''
      }
    }
  } else {
    return {
      success: true,
      error: ''
    }
  }
}