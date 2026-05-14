import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { describe, expect, it } from "vitest";

const stylesDir = dirname(fileURLToPath(import.meta.url));

describe("games shell animation preference styles", () => {
  it("stops games-specific animations when the shared animation preference is disabled", () => {
    const css = readFileSync(join(stylesDir, "games-shell.css"), "utf8");

    expect(css).toContain(".games-mobile-shell-animation-disabled .games-mobile-blob");
    expect(css).toContain(".games-mobile-shell-animation-disabled .games-spinner");
    expect(css).toMatch(
      /\.games-mobile-shell-animation-disabled \.games-mobile-blob,\s*\.games-mobile-shell-animation-disabled \.games-spinner\s*\{[^}]*animation: none !important;/s
    );
    expect(css).toMatch(
      /\.games-mobile-shell-animation-disabled \*,\s*\.games-mobile-shell-animation-disabled \*::before,\s*\.games-mobile-shell-animation-disabled \*::after\s*\{[^}]*transition: none !important;/s
    );
  });
});
