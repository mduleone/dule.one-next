export const round = (num, minimumFractionDigits, maximumFractionDigits) =>
  num.toLocaleString('en', {
    useGrouping: false,
    minimumFractionDigits,
    maximumFractionDigits,
  });

export const clamp = (number, min, max) => Math.min(Math.max(number, min), max);

export const randNaturalNumber = (max) => Math.floor(Math.random() * (max - 1));
