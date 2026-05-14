import { Outlet, useMatch } from "react-router-dom";
import { NavBar } from "@/components/layout/NavBar";
import { useBackgroundAnimation } from "@/hooks/useBackgroundAnimation";
import { useNovaThemeBridge } from "@/hooks/useNovaThemeBridge";
import "../styles/games-shell.css";

export function GamesMobileLayout() {
  const isGameplay = Boolean(useMatch("/games/poker/:tableAddress"));
  const isHub = Boolean(useMatch({ path: "/games", end: true }));
  const { enabled: backgroundAnimationEnabled, setEnabled } = useBackgroundAnimation();
  const { theme, setTheme, isInNovaWallet } = useNovaThemeBridge();
  const showSiteNav = !backgroundAnimationEnabled && isHub;

  return (
    <div
      className={`games-mobile-shell ${isGameplay ? "games-mobile-shell-gameplay" : ""} ${
        isHub ? "games-mobile-shell-hub" : ""
      } ${
        backgroundAnimationEnabled ? "" : "games-mobile-shell-animation-disabled"
      }`}
    >
      {showSiteNav ? (
        <NavBar
          theme={theme}
          onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
          hideThemeToggle={isInNovaWallet}
          backgroundAnimationEnabled={backgroundAnimationEnabled}
          onToggleBackgroundAnimation={() => setEnabled(true)}
        />
      ) : null}
      <div className="games-mobile-background" aria-hidden="true">
        <div className="games-mobile-blob games-mobile-blob-primary" />
        <div className="games-mobile-blob games-mobile-blob-accent" />
        <div className="games-mobile-blob games-mobile-blob-violet" />
        <div className="games-mobile-grid" />
      </div>
      <div className={`games-mobile-frame ${isGameplay ? "games-mobile-frame-gameplay" : ""}`}>
        <Outlet />
      </div>
    </div>
  );
}
