import {describe, it, expect} from "vitest";
import {makeDefault, score, overallAverage, bestStreak} from "./utils";

describe("utils", () => {
  it("score full should be 100", () => {
    const w = {workout: 3, photo: true, reading: true, resume: true};
    expect(score(w)).toBe(100);
  });

  it("score empty should be 0", () => {
    const w = {workout: 0, photo: false, reading: false, resume: false};
    expect(score(w)).toBe(0);
  });

  it("overallAverage uses only filled weeks", () => {
    const weeks = [
      {workout: 3, photo: true, reading: true, resume: true},
      {workout: 0, photo: false, reading: false, resume: false},
      {workout: 1, photo: false, reading: true, resume: false},
    ];
    expect(overallAverage(weeks)).toBeGreaterThan(0);
  });

  it("bestStreak computes longest consecutive ≥80%", () => {
    const weeks = [
      {workout: 3, photo: true, reading: true, resume: true},
      {workout: 3, photo: true, reading: true, resume: true},
      {workout: 0, photo: false, reading: false, resume: false},
      {workout: 3, photo: true, reading: true, resume: true},
    ];
    expect(bestStreak(weeks)).toBe(2);
  });
});
