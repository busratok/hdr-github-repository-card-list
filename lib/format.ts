export const formatStars = (stars: number) => {
  if (!Number.isFinite(stars) || stars <= 0) {
    return "0";
  }

  if (stars < 1000) {
    return String(stars);
  }

  const valueInThousands = stars / 1000;
  const rounded = Math.round(valueInThousands * 10) / 10;
  const formatted = rounded % 1 === 0 ? String(Math.trunc(rounded)) : String(rounded);

  return `${formatted}k`;
};
