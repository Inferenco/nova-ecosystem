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
      /\.games-mobile-shell-animation-disabled \.games-mobile-blob\s*\{[^}]*display: none;/s
    );
  });

  it("does not let the animation-off preference own layout or theme tokens", () => {
    const css = readFileSync(join(stylesDir, "games-shell.css"), "utf8");
    const disabledShellRule = css.match(
      /\.games-mobile-shell-animation-disabled\s*\{(?<body>[^}]*)\}/s
    );

    expect(disabledShellRule?.groups?.body).toBeDefined();
    expect(disabledShellRule?.groups?.body).not.toContain("--games-shell-width");
    expect(disabledShellRule?.groups?.body).not.toContain("--games-card-bg");
    expect(disabledShellRule?.groups?.body).not.toContain("padding:");
    expect(disabledShellRule?.groups?.body).not.toContain("background:");
    expect(css).not.toMatch(/\.games-mobile-shell-animation-disabled \.games-mobile-background\s*\{[^}]*display: none;/s);
    expect(css).not.toMatch(/^\.games-mobile-shell-animation-disabled \.games-mobile-frame\s*\{[^}]*background: transparent;/ms);
  });

  it("provides readable light-mode tokens for the games shell", () => {
    const css = readFileSync(join(stylesDir, "games-shell.css"), "utf8");
    const lightShellRule = css.match(
      /\[data-theme="light"\] \.games-mobile-shell\s*\{(?<body>[^}]*)\}/s
    );

    expect(lightShellRule?.groups?.body).toBeDefined();
    expect(lightShellRule?.groups?.body).toContain("--games-card-text: var(--text-primary);");
    expect(lightShellRule?.groups?.body).toContain("--games-card-muted: var(--text-secondary);");
    expect(lightShellRule?.groups?.body).toContain("--games-text-subtle: var(--text-muted);");
    expect(lightShellRule?.groups?.body).toContain("--games-card-bg:");
    expect(lightShellRule?.groups?.body).toContain("rgba(255, 255, 255, 0.96)");
  });

  it("does not render grid lines in the light animated games background", () => {
    const css = readFileSync(join(stylesDir, "games-shell.css"), "utf8");
    const lightBackgroundRule = css.match(
      /\[data-theme="light"\] \.games-mobile-background\s*\{(?<body>[^}]*)\}/s
    );

    expect(lightBackgroundRule?.groups?.body).toBeDefined();
    expect(lightBackgroundRule?.groups?.body).not.toContain("linear-gradient(90deg");
    expect(lightBackgroundRule?.groups?.body).not.toContain("1px, transparent 1px");
    expect(lightBackgroundRule?.groups?.body).toContain("radial-gradient(circle at 20% 0%");
  });

  it("keeps nested light-mode games routes from repainting the dark screen background", () => {
    const css = readFileSync(join(stylesDir, "games-shell.css"), "utf8");
    const lightScreenRule = css.match(
      /\[data-theme="light"\] \.games-mobile-shell \.games-screen\s*\{(?<body>[^}]*)\}/s
    );
    const lightFrameRule = css.match(
      /\[data-theme="light"\] \.games-mobile-shell \.games-mobile-frame\s*\{(?<body>[^}]*)\}/s
    );

    expect(lightScreenRule?.groups?.body).toBeDefined();
    expect(lightScreenRule?.groups?.body).toContain("rgba(247, 248, 252, 0.46)");
    expect(lightScreenRule?.groups?.body).not.toContain("rgba(10, 12, 17");
    expect(lightFrameRule?.groups?.body).toBeDefined();
    expect(lightFrameRule?.groups?.body).toContain("rgba(15, 23, 42, 0.12)");
  });

  it("removes the separate framed app chrome from the games hub shell", () => {
    const css = readFileSync(join(stylesDir, "games-shell.css"), "utf8");
    const hubFrameRule = css.match(
      /\.games-mobile-shell-hub \.games-mobile-frame,\s*\.games-mobile-shell-hub\.games-mobile-shell-animation-disabled \.games-mobile-frame\s*\{(?<body>[^}]*)\}/s
    );
    const hubTopbarRule = css.match(
      /\.games-mobile-shell-hub \.games-topbar\s*\{(?<body>[^}]*)\}/s
    );
    const lightHubFrameRule = css.match(
      /\[data-theme="light"\] \.games-mobile-shell\.games-mobile-shell-hub \.games-mobile-frame\s*\{(?<body>[^}]*)\}/s
    );
    const lightHubScreenRule = css.match(
      /\[data-theme="light"\] \.games-mobile-shell\.games-mobile-shell-hub \.games-screen\s*\{(?<body>[^}]*)\}/s
    );

    expect(hubFrameRule?.groups?.body).toBeDefined();
    expect(hubFrameRule?.groups?.body).toContain("border: 0;");
    expect(hubFrameRule?.groups?.body).toContain("border-radius: 0;");
    expect(hubFrameRule?.groups?.body).toContain("background: transparent;");
    expect(hubFrameRule?.groups?.body).toContain("box-shadow: none;");
    expect(lightHubFrameRule?.groups?.body).toBeDefined();
    expect(lightHubFrameRule?.groups?.body).toContain("border: 0;");
    expect(lightHubFrameRule?.groups?.body).toContain("box-shadow: none;");
    expect(lightHubScreenRule?.groups?.body).toBeDefined();
    expect(lightHubScreenRule?.groups?.body).toContain("background: transparent;");
    expect(hubTopbarRule?.groups?.body).toBeDefined();
    expect(hubTopbarRule?.groups?.body).toContain("display: none;");
  });

  it("keeps light-mode form labels, placeholders, and disabled icons readable", () => {
    const css = readFileSync(join(stylesDir, "games-shell.css"), "utf8");

    expect(css).toMatch(
      /\[data-theme="light"\] \.games-mobile-shell \.games-field-label\s*\{[^}]*color: rgba\(10, 16, 33, 0\.62\);/s
    );
    expect(css).toMatch(
      /\[data-theme="light"\] \.games-mobile-shell \.games-input::placeholder,\s*\[data-theme="light"\] \.games-mobile-shell \.games-textarea::placeholder\s*\{[^}]*color: rgba\(10, 16, 33, 0\.42\);/s
    );
    expect(css).toMatch(
      /\[data-theme="light"\] \.games-mobile-shell \.games-icon-button\[disabled\]\s*\{[^}]*opacity: 1;/s
    );
  });
});
