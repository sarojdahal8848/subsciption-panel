export const expiryStatus = (date: string) => {
  const d1 = new Date();
  const d2 = new Date(date);
  return d1 > d2;
};
