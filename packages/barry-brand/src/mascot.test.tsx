// @vitest-environment jsdom

import { act } from "react";
import type { Root } from "react-dom/client";
import { createRoot } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { BARRY_EXPRESSIONS, BarryMascot } from "./mascot.js";

let root: Root;
let container: HTMLDivElement;

beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});

afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

describe("BarryMascot", () => {
  it("renders each supported expression accessibly", async () => {
    for (const expression of BARRY_EXPRESSIONS) {
      await act(async () =>
        root.render(<BarryMascot expression={expression} size={20} label="Barry" />),
      );
      const svg = container.querySelector("svg");
      expect(svg?.getAttribute("aria-label")).toBe("Barry");
      expect(svg?.getAttribute("data-expression")).toBe(expression);
      expect(svg?.getAttribute("data-eyes")).toBe(
        (
          {
            idle: "happy",
            thinking: "asymmetric",
            working: "focused",
            talking: "attentive",
            success: "happy",
            confused: "asymmetric",
            error: "concerned",
            waiting: "relaxed",
          } as const
        )[expression],
      );
      expect(svg?.getAttribute("data-mouth")).toBe(
        (
          {
            idle: "smile",
            thinking: "neutral",
            working: "neutral",
            talking: "talking",
            success: "large-smile",
            confused: "uncertain",
            error: "frown",
            waiting: "neutral",
          } as const
        )[expression],
      );
      expect(svg?.querySelector(".barry-mascot__eye--left")?.getAttribute("d")).toBe(
        (
          {
            idle: "M31 52 Q36 44 41 52",
            thinking: "M31 52 Q35 42 41 49",
            working: "M31 50 L41 52",
            talking: "M31 50 Q36 42 41 50 Q36 57 31 50 Z",
            success: "M31 52 Q36 44 41 52",
            confused: "M31 52 Q35 42 41 49",
            error: "M31 50 Q36 42 41 49",
            waiting: "M31 51 Q36 48 41 51",
          } as const
        )[expression],
      );
      expect(svg?.querySelector(".barry-mascot__mouth")?.getAttribute("d")).toBe(
        (
          {
            idle: "M50 66 V69 M43 68 Q50 75 57 68",
            thinking: "M44 69 Q50 70 56 69",
            working: "M44 69 Q50 70 56 69",
            talking: "M50 66 V69 M43 68 Q50 75 57 68",
            success: "M41 67 Q50 78 59 67",
            confused: "M44 70 Q47 67 50 70 Q53 73 56 70",
            error: "M43 72 Q50 68 57 72",
            waiting: "M44 69 Q50 70 56 69",
          } as const
        )[expression],
      );
      expect(svg?.getAttribute("width")).toBe("20");
    }
  });

  it("hides the decorative mascot from assistive technology without a label", async () => {
    await act(async () => root.render(<BarryMascot expression="idle" />));
    expect(container.querySelector("svg")?.getAttribute("aria-hidden")).toBe("true");
  });

  it("keeps a static face when motion is disabled", async () => {
    await act(async () => root.render(<BarryMascot expression="talking" motion={false} />));
    expect(container.querySelector("svg")?.getAttribute("data-motion")).toBe("false");
    expect(container.querySelector("svg")?.classList.contains("barry-mascot--motion")).toBe(false);
  });
});
