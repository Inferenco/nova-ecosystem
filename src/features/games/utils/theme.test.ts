import { describe, expect, it } from "vitest";
import { TABLE_COLORS } from "../config/games";
import { deriveThemeFromColor } from "./theme";

describe("deriveThemeFromColor", () => {
  it("exposes light-mode table variables for every table color", () => {
    Object.entries(TABLE_COLORS).forEach(([index, tableColor]) => {
      const theme = deriveThemeFromColor(Number(index));

      expect(theme.lightFelt).toBe(tableColor.light.felt);
      expect(theme.lightFeltDark).toBe(tableColor.light.feltDark);
      expect(theme.lightRail).toBe(tableColor.light.rail);
      expect(theme.lightRailEdge).toBe(tableColor.light.railEdge);
      expect(theme.lightAccent).toBe(tableColor.light.accent);
      expect(theme.lightAccentGlow).toMatch(/^rgba\(/);
    });
  });

  it("preserves existing dark-mode table variables", () => {
    const theme = deriveThemeFromColor(1);

    expect(theme.felt).toBe(TABLE_COLORS[1].felt);
    expect(theme.rail).toBe(TABLE_COLORS[1].rail);
    expect(theme.accent).toBe(TABLE_COLORS[1].accent);
    expect(theme.tableFeltLight).toBe("#2e5c3a");
  });
});
