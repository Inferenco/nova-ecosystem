import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { describe, expect, it } from "vitest";

const stylesDir = dirname(fileURLToPath(import.meta.url));

describe("global safe area styles", () => {
  it("does not reserve safe-area padding on the body for embedded gameplay screens", () => {
    const globalCss = readFileSync(join(stylesDir, "global.css"), "utf8");

    expect(globalCss).not.toMatch(/body\s*\{[^}]*env\(safe-area-inset-/s);
  });
});
