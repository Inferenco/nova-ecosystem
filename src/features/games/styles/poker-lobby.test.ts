import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const stylesDir = dirname(fileURLToPath(import.meta.url));

describe("poker lobby light-mode styles", () => {
  it("sets explicit readable colors for light-mode poker lobby and create-table affordances", () => {
    const css = readFileSync(join(stylesDir, "poker-lobby.css"), "utf8");

    expect(css).toMatch(
      /\[data-theme="light"\] \.games-mobile-shell \.games-poker-card-title\s*\{[^}]*color: rgba\(10, 16, 33, 0\.62\);/s
    );
    expect(css).toMatch(
      /\[data-theme="light"\] \.games-mobile-shell \.games-poker-create-icon\s*\{[^}]*color: #c98608;/s
    );
    expect(css).toMatch(
      /\[data-theme="light"\] \.games-mobile-shell \.games-poker-filter-placeholder\s*\{[^}]*color: rgba\(10, 16, 33, 0\.54\);/s
    );
  });
});
