import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { barryBrand, barryThemeTokens } from "./index.js";

describe("Barry brand", () => {
  it("exports the approved product identity and palette", () => {
    expect(barryBrand.name).toBe("Barry");
    expect(barryBrand.colors).toEqual({
      chocolate: "#3E2214",
      gold: "#FFC928",
      cream: "#FFF3D9",
      background: "#FBF8F2",
      charcoal: "#33383D",
    });
  });

  it("keeps exported semantic CSS values aligned with the theme config", () => {
    const css = readFileSync(fileURLToPath(new URL("./brand.css", import.meta.url)), "utf8");
    expect(css).toContain(
      `--barry-background: ${barryThemeTokens.light.background.toLowerCase()};`,
    );
    expect(css).toContain(`--barry-background: ${barryThemeTokens.dark.background.toLowerCase()};`);
    expect(css).toContain(`--barry-accent: ${barryThemeTokens.light.accent.toLowerCase()};`);
    expect(css).toContain(`--barry-accent: ${barryThemeTokens.dark.accent.toLowerCase()};`);
  });

  it("disables mascot animation for reduced-motion users", () => {
    const css = readFileSync(fileURLToPath(new URL("./mascot.css", import.meta.url)), "utf8");
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toContain("animation: none;");
    expect(css).toContain("transition: none;");
  });

  it("provides contrasting semantic light and dark themes", () => {
    expect(barryThemeTokens.light).toEqual({
      background: "#FBF8F2",
      foreground: "#33383D",
      card: "#FFF3D9",
      primary: "#3E2214",
      primaryForeground: "#FFF3D9",
      accent: "#FFC928",
    });
    expect(barryThemeTokens.dark).toEqual({
      background: "#3E2214",
      foreground: "#FFF3D9",
      card: "#33383D",
      primary: "#FFC928",
      primaryForeground: "#3E2214",
      accent: "#FFC928",
    });
  });
});
