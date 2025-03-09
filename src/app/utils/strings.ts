export const truncate = (s: string, length = 10) => {
  if (s.length > length) {
    return s.slice(0, length - 2) + "..";
  }

  return s;
};
