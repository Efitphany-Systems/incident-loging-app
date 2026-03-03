export const YES_NO = (value?: boolean | null): string => {
  if (value === true) return "Yes";
  if (value === false) return "No";
  return "—";
};
