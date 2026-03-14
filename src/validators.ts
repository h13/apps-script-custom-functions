export function isValidEmail(value: string): boolean {
  if (value === "") return false;
  const pattern =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  return pattern.test(value);
}

export function isValidPhoneJp(value: string): boolean {
  if (value === "") return false;
  const patterns = [
    /^0\d-\d{4}-\d{4}$/, // 固定電話（2桁市外局番）: 03-1234-5678
    /^0\d{9}$/, // 固定電話（ハイフンなし）: 0312345678
    /^0\d{2}-\d{3,4}-\d{4}$/, // 固定電話（3桁市外局番）: 045-123-4567
    /^0[789]0-\d{4}-\d{4}$/, // 携帯: 090-1234-5678
    /^0[789]0\d{8}$/, // 携帯（ハイフンなし）: 09012345678
    /^0120-\d{3}-\d{3}$/, // フリーダイヤル: 0120-123-456
    /^0120\d{6}$/, // フリーダイヤル（ハイフンなし）: 0120123456
  ];
  return patterns.some((p) => p.test(value));
}

export function isValidPostalCode(value: string): boolean {
  if (value === "") return false;
  const pattern = /^\d{3}-?\d{4}$/;
  return pattern.test(value);
}
