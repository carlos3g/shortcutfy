export const adjustPosition = (position: number, length: number, offset: number = 0, limit?: number): number => {
  if (position - offset < 0) {
    return length - 1;
  }

  if (position >= length) {
    return 0;
  }

  if (limit && position >= limit) {
    return 0;
  }

  return position;
};
