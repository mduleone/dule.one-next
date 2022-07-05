export const round = (num, minimumFractionDigits, maximumFractionDigits) =>
  num.toLocaleString('en', {
    useGrouping: false,
    minimumFractionDigits,
    maximumFractionDigits,
  });
