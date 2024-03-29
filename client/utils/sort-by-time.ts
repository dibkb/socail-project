type input = { createdAt: string };
export const sortbyTimeAscending = (a: input, b: input) => {
  const timeA = new Date(a.createdAt).getTime();
  const timeB = new Date(b.createdAt).getTime();
  return timeB - timeA;
};
export const sortbyTimeDescending = (a: input, b: input) => {
  const timeA = new Date(a.createdAt).getTime();
  const timeB = new Date(b.createdAt).getTime();
  return timeA - timeB;
};
