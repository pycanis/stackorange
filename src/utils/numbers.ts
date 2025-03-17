const formatter = new Intl.NumberFormat(
  typeof navigator === "undefined" ? "en-US" : navigator.language,
  {
    style: "decimal",
  }
);

export const formatNumber = (number: number) => formatter.format(number);
