import { describe, expect, it } from 'vitest';
import { clamp, clampToNonNegative, toNumber } from '../src/lib/numberfuns';

describe('numberfuns', () => {
  describe('toNumber', () => {
    it('returns numeric values as numbers', () => {
      expect(toNumber(12)).toBe(12);
      expect(toNumber('42')).toBe(42);
      expect(toNumber('3.5')).toBe(3.5);
    });

    it('returns fallback for non-finite values', () => {
      expect(toNumber(undefined, 7)).toBe(7);
      expect(toNumber('abc', 9)).toBe(9);
      expect(toNumber(Number.NaN, 11)).toBe(11);
    });

    it('uses default fallback of 0 when not provided', () => {
      expect(toNumber('not-a-number')).toBe(0);
    });
  });

  describe('clamp', () => {
    it('returns value when inside range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
    });

    it('returns min when value is below range', () => {
      expect(clamp(-1, 0, 10)).toBe(0);
    });

    it('returns max when value is above range', () => {
      expect(clamp(25, 0, 10)).toBe(10);
    });
  });

  describe('clampToNonNegative', () => {
    it('keeps non-negative numbers', () => {
      expect(clampToNonNegative(0)).toBe(0);
      expect(clampToNonNegative(12.25)).toBe(12.25);
      expect(clampToNonNegative('5')).toBe(5);
    });

    it('converts negatives and invalid values to non-negative output', () => {
      expect(clampToNonNegative(-7)).toBe(0);
      expect(clampToNonNegative('-2')).toBe(0);
      expect(clampToNonNegative('abc')).toBe(0);
    });
  });
});
