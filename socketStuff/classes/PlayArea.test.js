import { beforeAll, describe, it, vi, expect } from 'vitest';
import { PlayArea } from './PlayArea.js';
import { Baballe } from './Baballe-a.js';

describe('Testing the PlayArea class', () => {
  /** @type {PlayArea} */
  let playArea;
  const height = 500;
  const width = 500;

  beforeAll(() => {
    playArea = new PlayArea(height, width);
  });

  it('should have a height and a width', () => {
    expect(playArea.height).toBe(height);
    expect(playArea.width).toBe(width);
  });

  it('should have a baballes property of length 5', () => {
    expect(playArea.baballes).toHaveLength(5);
  });

  it('there should be 5 instances of Baballe inside the baballes property', () => {
    playArea.baballes.forEach((baballe) => {
      expect(baballe).toBeInstanceOf(Baballe);
    });
  });
});
