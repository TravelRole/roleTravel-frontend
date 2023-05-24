export function formatDate(date) {
  const year = date?.getFullYear();
  const month = ("0" + (date?.getMonth() + 1)).slice(-2); // 월은 0부터 시작하기 때문에 1을 더해줍니다.
  const day = ("0" + date?.getDate()).slice(-2);

  return `${year}/${month}/${day}`;
}
