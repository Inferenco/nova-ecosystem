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
});
