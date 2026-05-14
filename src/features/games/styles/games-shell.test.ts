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

  it("uses the shared Nova visual system for the static animation-off games shell", () => {
    const css = readFileSync(join(stylesDir, "games-shell.css"), "utf8");
    const disabledShellRule = css.match(
      /\.games-mobile-shell-animation-disabled\s*\{(?<body>[^}]*)\}/s
    );
    const disabledBackgroundRule = css.match(
      /\.games-mobile-shell-animation-disabled \.games-mobile-background\s*\{(?<body>[^}]*)\}/s
    );

    expect(disabledShellRule?.groups?.body).toBeDefined();
    expect(disabledShellRule?.groups?.body).toContain("var(--bg-primary)");
    expect(disabledShellRule?.groups?.body).toContain("var(--surface-glass-border)");
    expect(disabledShellRule?.groups?.body).toContain("var(--nova-cyan)");
    expect(disabledShellRule?.groups?.body).toContain("padding: 0;");
    expect(disabledBackgroundRule?.groups?.body).toBeDefined();
    expect(disabledBackgroundRule?.groups?.body).toContain("display: none;");
  });

  it("removes the separate framed app chrome from the static animation-off games shell", () => {
    const css = readFileSync(join(stylesDir, "games-shell.css"), "utf8");
    const disabledFrameRule = css.match(
      /\.games-mobile-shell-animation-disabled \.games-mobile-frame\s*\{(?<body>[^}]*)\}/s
    );
    const disabledTopbarRule = css.match(
      /\.games-mobile-shell-animation-disabled \.games-topbar\s*\{(?<body>[^}]*)\}/s
    );

    expect(disabledFrameRule?.groups?.body).toBeDefined();
    expect(disabledFrameRule?.groups?.body).toContain("border: 0;");
    expect(disabledFrameRule?.groups?.body).toContain("border-radius: 0;");
    expect(disabledFrameRule?.groups?.body).toContain("background: transparent;");
    expect(disabledFrameRule?.groups?.body).toContain("box-shadow: none;");
    expect(disabledTopbarRule?.groups?.body).toBeDefined();
    expect(disabledTopbarRule?.groups?.body).toContain("margin-left: calc(50% - 50vw);");
    expect(css).toMatch(
      /\.games-mobile-shell-animation-disabled\.games-mobile-shell-hub \.games-topbar\s*\{[^}]*display: none;/s
    );
  });
});
