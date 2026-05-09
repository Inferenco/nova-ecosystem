import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { describe, expect, it } from "vitest";

const stylesDir = dirname(fileURLToPath(import.meta.url));

describe("poker mobile gameplay safe area styles", () => {
  it("does not apply browser safe-area top padding inside the embedded gameplay shell", () => {
    const css = readFileSync(join(stylesDir, "poker-gameplay-mobile.css"), "utf8");
    const shellRule = css.match(/\.poker-gameplay-shell-mobile\s*\{(?<body>[^}]*)\}/s);

    expect(shellRule?.groups?.body).toBeDefined();
    expect(shellRule?.groups?.body).not.toContain("env(safe-area-inset-top)");
  });

  it("reserves a table-height row in the mobile grid instead of letting controls compress it", () => {
    const css = readFileSync(join(stylesDir, "poker-gameplay-mobile.css"), "utf8");

    expect(css).toContain(
      "grid-template-rows: auto auto minmax(var(--poker-mobile-stage-min-h), 1fr) auto auto;"
    );
  });

  it("uses compact h760 chrome and passive dock styling for embedded wallet browser height", () => {
    const css = readFileSync(join(stylesDir, "poker-gameplay-mobile.css"), "utf8");

    expect(css).toContain(".poker-gameplay-shell-mobile.h760 {");
    expect(css).toContain("--poker-mobile-primary-btn-h: 30px;");
    expect(css).toContain("--poker-mobile-secondary-btn-h: 24px;");
    expect(css).toContain(".poker-gameplay-dock-mobile.is-passive");
    expect(css).toContain("background: rgba(255, 255, 255, 0.035);");
  });
});
