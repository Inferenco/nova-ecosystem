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

  it("assigns extra mobile viewport height to the gameplay stage", () => {
    const css = readFileSync(join(stylesDir, "poker-gameplay-mobile.css"), "utf8");

    expect(css).toContain("grid-template-rows: auto auto minmax(var(--poker-mobile-stage-h), 1fr) auto auto;");
    expect(css).toContain("align-content: stretch;");
    expect(css).toContain("height: 100%;");
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
    expect(css).toContain("--poker-mobile-stage-h: 264px;");
    expect(css).toContain("--poker-mobile-primary-btn-h: 27px;");
    expect(css).toContain("--poker-mobile-secondary-btn-h: 21px;");
    expect(css).toContain("--poker-mobile-gap: 2px;");
    expect(css).toContain(".poker-gameplay-dock-mobile.is-passive");
    expect(css).toContain("background: rgba(255, 255, 255, 0.035);");
  });

  it("keeps h760 dock control heights variable-driven so iPhone-width rules cannot hide the secondary row", () => {
    const css = readFileSync(join(stylesDir, "poker-gameplay-mobile.css"), "utf8");

    expect(css).toContain("min-height: var(--poker-mobile-primary-btn-h);");
    expect(css).toContain("min-height: var(--poker-mobile-secondary-btn-h);");
    expect(css).not.toContain(".poker-gameplay-dock-mobile .poker-gameplay-chip-button {\n  min-height: 32px;");
    expect(css).not.toContain(".poker-gameplay-dock-mobile .poker-gameplay-pill-button {\n  min-height: 27px;");
  });

  it("does not reserve host browser bottom space inside h860 embedded browser heights", () => {
    const css = readFileSync(join(stylesDir, "poker-gameplay-mobile.css"), "utf8");

    expect(css).toContain("--poker-mobile-host-bottom-reserve: 0px;");
    expect(css).toContain("padding: 6px 6px calc(6px + var(--poker-mobile-host-bottom-reserve)) 6px;");
    expect(css).toContain(".poker-gameplay-shell-mobile.h860 {");
    expect(css).not.toContain("--poker-mobile-host-bottom-reserve: 76px;");
    expect(css).toContain("--poker-mobile-stage-h: 300px;");
    expect(css).toContain("--poker-mobile-primary-btn-h: 28px;");
    expect(css).toContain("--poker-mobile-secondary-btn-h: 22px;");
  });

  it("uses the missing waiting-control row space to give active h860 hands a taller stage", () => {
    const css = readFileSync(join(stylesDir, "poker-gameplay-mobile.css"), "utf8");

    expect(css).toContain(".poker-gameplay-shell-mobile.h860.is-active-hand {");
    expect(css).toContain("--poker-mobile-stage-h: 340px;");
  });
});
