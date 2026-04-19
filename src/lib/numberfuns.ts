  function toNumber(value: unknown, fallback = 0): number {
    const numericValue = Number(value);
    return Number.isFinite(numericValue) ? numericValue : fallback;
  }

  function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  function clampToNonNegative(value: unknown): number {
    return Math.max(0, toNumber(value));
  }

  export { toNumber, clamp, clampToNonNegative };