// 휴대전화 TextField 입력시 자동으로 하이픈 "-" 입력
export const autoHyphen = (phoneNumber: string): string => {
  const number = phoneNumber.trim().replace(/[^0-9]/g, "");
  if (number.length < 4) return number;
  if (number.length < 8) return number.replace(/(\d{3})(\d{1})/, "$1-$2");
  if (number.length < 12)
    return number.replace(/(\d{3})(\d{4})(\d{1})/, "$1-$2-$3");
  return number.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
};

// 출생년도 TextField를 숫자 입력으로 제한
// 4글자만 입력되도록 제한
export const handleNumberTypeInputMaxLength = (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, "");

  if (e.target.value.length > 4) {
    e.target.value = e.target.value.slice(0, 4);
  }
};
