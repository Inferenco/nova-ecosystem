import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const stylesDir = dirname(fileURLToPath(import.meta.url));

describe("poker gameplay shared light-mode styles", () => {
  it("defines light-mode gameplay chrome and table surfaces", () => {
    const css = readFileSync(join(stylesDir, "poker-gameplay-shared.css"), "utf8");

    expect(css).toContain('[data-theme="light"] .games-gameplay-shell-wallet.poker-gameplay-route');
    expect(css).toContain('[data-theme="light"] .games-gameplay-shell-wallet.poker-gameplay-route::before');
    expect(css).toContain('[data-theme="light"] .poker-gameplay-shell');
    expect(css).toContain('[data-theme="light"] .poker-gameplay-stage-surface');
    expect(css).toContain('[data-theme="light"] .poker-gameplay-table-rim');
    expect(css).toContain('[data-theme="light"] .poker-gameplay-table-felt');
    expect(css).toContain('[data-theme="light"] .poker-gameplay-pot-pill');
  });

  it("uses creator-selected light table variables in the felt and rail", () => {
    const css = readFileSync(join(stylesDir, "poker-gameplay-shared.css"), "utf8");
    const lightRailRule = css.match(
      /\[data-theme="light"\] \.poker-gameplay-table-rim\s*\{(?<body>[^}]*)\}/s
    );

    expect(css).toContain("var(--poker-felt-light");
    expect(css).toContain("var(--poker-felt-light-dark");
    expect(css).toContain("var(--poker-rail-light");
    expect(css).toContain("var(--poker-rail-light-edge");
    expect(css).toContain("var(--poker-accent-light");
    expect(lightRailRule?.groups?.body).toContain('url("/assets/casino/wood-texture.png") center / cover no-repeat');
    expect(lightRailRule?.groups?.body).toContain("background-blend-mode: screen, overlay, normal;");
    expect(lightRailRule?.groups?.body).toContain("rgba(255, 244, 218, 0.5)");
    expect(lightRailRule?.groups?.body).toContain("rgba(255, 255, 255, 0.34)");
  });

  it("defines readable light-mode seat and dock affordances", () => {
    const css = readFileSync(join(stylesDir, "poker-gameplay-shared.css"), "utf8");

    expect(css).toContain('[data-theme="light"] .poker-gameplay-seat-avatar.is-empty');
    expect(css).toContain('[data-theme="light"] .poker-gameplay-seat-empty-copy');
    expect(css).toContain('[data-theme="light"] .poker-gameplay-seat-name');
    expect(css).toContain('[data-theme="light"] .poker-gameplay-dock');
    expect(css).toContain('[data-theme="light"] .poker-gameplay-chip-button');
  });

  it("uses a washed casino artwork layer instead of the dark artwork treatment in light mode", () => {
    const css = readFileSync(join(stylesDir, "poker-gameplay-shared.css"), "utf8");
    const lightRouteRule = css.match(
      /\[data-theme="light"\] \.games-gameplay-shell-wallet\.poker-gameplay-route\s*\{(?<body>[^}]*)\}/s
    );
    const lightRouteArtworkRule = css.match(
      /\[data-theme="light"\] \.games-gameplay-shell-wallet\.poker-gameplay-route::before\s*\{(?<body>[^}]*)\}/s
    );

    expect(lightRouteRule?.groups?.body).toBeDefined();
    expect(lightRouteRule?.groups?.body).toContain("rgba(247, 248, 252, 0.98)");
    expect(lightRouteRule?.groups?.body).not.toContain("#050608");
    expect(lightRouteRule?.groups?.body).not.toContain("#090b11");
    expect(lightRouteArtworkRule?.groups?.body).toBeDefined();
    expect(lightRouteArtworkRule?.groups?.body).toContain('url("/assets/casino/nova-casino-wide.jpg") center / cover no-repeat');
    expect(lightRouteArtworkRule?.groups?.body).not.toContain("rgba(255, 255, 255, 0.72)");
    expect(lightRouteArtworkRule?.groups?.body).toContain("opacity: 0.2;");
    expect(lightRouteArtworkRule?.groups?.body).toContain("mix-blend-mode: multiply;");
    expect(lightRouteArtworkRule?.groups?.body).toContain("brightness(1.22)");
    expect(css).toContain('[data-theme="light"] .games-gameplay-shell-wallet.poker-gameplay-route::after');
    expect(css).toContain(
      '[data-theme="light"] .games-gameplay-shell-wallet.poker-gameplay-route > :not(.games-overlay)'
    );
    expect(css).not.toContain('[data-theme="light"] .games-gameplay-shell-wallet.poker-gameplay-route > *');
  });

  it("keeps the table title readable in the light gameplay header", () => {
    const css = readFileSync(join(stylesDir, "poker-gameplay-shared.css"), "utf8");

    expect(css).toMatch(
      /\[data-theme="light"\] \.poker-gameplay-shell \.games-wallet-table-name\s*\{[^}]*color: #0a1021;/s
    );
  });
});
