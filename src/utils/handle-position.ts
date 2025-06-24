export const handlePosition = (index: number, length: number) => {
  if (length === 1) return 'position-50';
  const mid = Math.floor(length / 2);
  const q = 40 / mid;

  if (length % 2 == 1) {
    if (index === mid) {
      return 'position-50';
    } else {
      const result = index < mid ? 10 + q * index : 90 - q * (length - index - 1);
      return 'position-' + Math.floor(result);
    }
  } else {
    const result = index < mid ? 15 + q * index : 85 - q * (length - index - 1);
    return 'position-' + Math.floor(result);
  }
};
