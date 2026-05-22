import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const stylesDir = dirname(fileURLToPath(import.meta.url));

describe("poker modal light-mode styles", () => {
  it("gives the casino terms modal a readable light-mode surface", () => {
    const css = readFileSync(join(stylesDir, "poker-modals.css"), "utf8");

    expect(css).toContain('[data-theme="light"] .games-mobile-shell .games-disclaimer-panel');
    expect(css).toMatch(
      /\[data-theme="light"\] \.games-mobile-shell \.games-disclaimer-panel\s*\{[^}]*rgba\(255, 255, 255, 0\.98\)[^}]*color: var\(--text-primary\);/s
    );
    expect(css).toMatch(
      /\[data-theme="light"\] \.games-mobile-shell \.games-disclaimer-panel \.games-modal-title,\s*\[data-theme="light"\] \.games-mobile-shell \.games-disclaimer-panel \.games-section-title\s*\{[^}]*color: var\(--text-primary\);/s
    );
    expect(css).toMatch(
      /\[data-theme="light"\] \.games-mobile-shell \.games-disclaimer-panel \.games-section-copy,\s*\[data-theme="light"\] \.games-mobile-shell \.games-disclaimer-panel \.games-status-text,\s*\[data-theme="light"\] \.games-mobile-shell \.games-disclaimer-panel li\s*\{[^}]*color: rgba\(10, 16, 33, 0\.68\);/s
    );
  });

  it("keeps the disclaimer scroll affordance and acknowledgment callout visible in light mode", () => {
    const css = readFileSync(join(stylesDir, "poker-modals.css"), "utf8");

    expect(css).toMatch(
      /\[data-theme="light"\] \.games-mobile-shell \.games-disclaimer-scroll\s*\{[^}]*scrollbar-color: rgba\(15, 23, 42, 0\.24\) rgba\(15, 23, 42, 0\.05\);/s
    );
    expect(css).toMatch(
      /\[data-theme="light"\] \.games-mobile-shell \.games-disclaimer-scroll::-webkit-scrollbar-thumb\s*\{[^}]*background: rgba\(15, 23, 42, 0\.24\);/s
    );
    expect(css).toMatch(
      /\[data-theme="light"\] \.games-mobile-shell \.games-disclaimer-panel \.games-disclaimer-highlight\s*\{[^}]*rgba\(255, 255, 255, 0\.96\)[^}]*rgba\(236, 248, 255, 0\.88\)/s
    );
    expect(css).toMatch(
      /\[data-theme="light"\] \.games-mobile-shell \.games-disclaimer-panel \.games-disclaimer-highlight-copy\s*\{[^}]*color: rgba\(10, 16, 33, 0\.78\);/s
    );
  });

  it("gives the table chat modal a readable light-mode surface", () => {
    const css = readFileSync(join(stylesDir, "poker-modals.css"), "utf8");

    expect(css).toContain('[data-theme="light"] .games-mobile-shell .games-chat-overlay');
    expect(css).toMatch(
      /\[data-theme="light"\] \.games-mobile-shell \.games-chat-panel\s*\{[^}]*rgba\(255, 255, 255, 0\.98\)[^}]*color: var\(--text-primary\);/s
    );
    expect(css).toMatch(
      /\[data-theme="light"\] \.games-mobile-shell \.games-chat-message\s*\{[^}]*rgba\(255, 255, 255, 0\.82\)[^}]*box-shadow: 0 8px 22px rgba\(15, 23, 42, 0\.07\);/s
    );
    expect(css).toMatch(
      /\[data-theme="light"\] \.games-mobile-shell \.games-chat-message p\s*\{[^}]*color: rgba\(10, 16, 33, 0\.82\);/s
    );
  });
});
