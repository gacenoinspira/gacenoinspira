export const dmsToDecimal = (dms: string): number => {
  const parts = dms.match(/([NSWE])(\d+)\s(\d+)\s([\d.]+)/);
  if (!parts) return NaN;
  const [, cardinal, degrees, minutes, seconds] = parts;
  let decimal = parseFloat(degrees) + (parseFloat(minutes) / 60) + (parseFloat(seconds) / 3600);

  if (['S', 'W'].includes(cardinal)) {
    decimal = -decimal;
  }
  return decimal;
}