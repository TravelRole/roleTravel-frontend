export const convertCategoryName = (name) => {
  switch (name) {
    case '필수 준비물':
      return 'ESSENTIAL'
    case '의류':
      return 'CLOTHES'
    case '세면 용품':
      return 'TOILETRIES'
    case '상비약':
      return 'MEDICINE'
    case '계절 용품':
      return 'SEASONAL'
    case '조리 용품':
      return 'COOKWARE'
    case '기타 용품':
      return 'ETC'
    case '해외 여행':
      return 'ABROAD'
    default: return;
  }
};