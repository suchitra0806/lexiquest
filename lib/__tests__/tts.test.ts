import { describe, expect, it } from "vitest";
import { isSpeechSupported } from "../tts";

describe("isSpeechSupported", () => {
  it("returns false when window/speechSynthesis is unavailable (e.g. SSR or an unsupported browser)", () => {
    expect(isSpeechSupported()).toBe(false);
  });
});
