import { describe, expect, it } from "vitest";
import { shuffle } from "../shuffle";

describe("shuffle", () => {
  it("preserves all elements without mutating the input", () => {
    const original = [1, 2, 3, 4, 5];
    const copy = [...original];
    const result = shuffle(original);

    expect(original).toEqual(copy);
    expect(result.sort()).toEqual(copy.sort());
  });

  it("handles empty and single-element arrays", () => {
    expect(shuffle([])).toEqual([]);
    expect(shuffle(["only"])).toEqual(["only"]);
  });
});
