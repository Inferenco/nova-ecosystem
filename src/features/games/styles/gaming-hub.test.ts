import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const stylesDir = dirname(fileURLToPath(import.meta.url));

describe("gaming hub light mode styles", () => {
  it("lightens hub room tiles when the light games shell is active", () => {
    const css = readFileSync(join(stylesDir, "gaming-hub.css"), "utf8");

    expect(css).toContain(
      '[data-theme="light"] .games-mobile-shell .games-hub-nav-card'
    );
    expect(css).toContain("filter: saturate(0.92) brightness(1.42) contrast(0.82);");
    expect(css).toContain(
      '[data-theme="light"] .games-mobile-shell .games-hub-nav-content'
    );
    expect(css).toContain(
      '[data-theme="light"] .games-mobile-shell .games-hub-nav-title'
    );
    expect(css).toContain("color: #0a1021;");
    expect(css).toContain("text-shadow: none;");
  });
});
