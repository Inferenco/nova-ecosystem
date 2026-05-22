import { describe, expect, it } from "vitest";
import { TABLE_COLORS } from "./games";

const LIGHT_KEYS = ["felt", "feltDark", "rail", "railEdge", "accent"] as const;

describe("table color palettes", () => {
  it("defines complete light-mode variants for every table color", () => {
    Object.values(TABLE_COLORS).forEach((tableColor) => {
      LIGHT_KEYS.forEach((key) => {
        expect(tableColor.light[key]).toMatch(/^#[0-9a-f]{6}$/i);
      });
    });
  });

  it("keeps the planned light-mode color values stable", () => {
    expect(TABLE_COLORS[0].light).toEqual({
      felt: "#86d8ea",
      feltDark: "#4ba9c4",
      rail: "#b88a50",
      railEdge: "#7a5430",
      accent: "#0789b8"
    });
    expect(TABLE_COLORS[5].light).toEqual({
      felt: "#c3ca84",
      feltDark: "#8e984a",
      rail: "#b4914d",
      railEdge: "#6d562b",
      accent: "#8b7b22"
    });
  });
});
