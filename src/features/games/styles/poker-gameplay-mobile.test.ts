import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { describe, expect, it } from "vitest";

const stylesDir = dirname(fileURLToPath(import.meta.url));

describe("poker mobile gameplay safe area styles", () => {
  it("does not apply browser safe-area padding inside the embedded gameplay shell or dock", () => {
    const css = readFileSync(join(stylesDir, "poker-gameplay-mobile.css"), "utf8");
    const shellRule = css.match(/\.poker-gameplay-shell-mobile\s*\{(?<body>[^}]*)\}/s);
    const dockRule = css.match(/\.poker-gameplay-dock-mobile\s*\{(?<body>[^}]*)\}/s);

    expect(shellRule?.groups?.body).toBeDefined();
    expect(dockRule?.groups?.body).toBeDefined();
    expect(shellRule?.groups?.body).not.toContain("env(safe-area-inset-");
    expect(dockRule?.groups?.body).not.toContain("env(safe-area-inset-");
  });

  it("uses content-sized mobile rows so extra viewport height does not stretch the table", () => {
    const css = readFileSync(join(stylesDir, "poker-gameplay-mobile.css"), "utf8");

    expect(css).toContain("grid-template-rows: auto auto auto auto auto;");
    expect(css).toContain("align-content: start;");
    expect(css).toContain("height: var(--poker-mobile-stage-h);");
  });

  it("keeps the mobile table oval on a fixed poker-table aspect instead of stretching with stage height", () => {
    const css = readFileSync(join(stylesDir, "poker-gameplay-mobile.css"), "utf8");
    const ovalRule = css.match(/\.poker-gameplay-stage-mobile \.poker-gameplay-table-oval\s*\{(?<body>[^}]*)\}/s);

    expect(ovalRule?.groups?.body).toBeDefined();
    expect(ovalRule?.groups?.body).toContain("aspect-ratio: var(--poker-mobile-table-aspect);");
    expect(ovalRule?.groups?.body).toContain("height: var(--poker-mobile-table-h);");
    expect(ovalRule?.groups?.body).not.toContain("inset:");
    expect(css).not.toContain(".poker-gameplay-shell-mobile.h760 .poker-gameplay-stage-mobile .poker-gameplay-table-oval");
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
