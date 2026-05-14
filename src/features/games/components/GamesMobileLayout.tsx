import { Outlet, useMatch } from "react-router-dom";
import { useBackgroundAnimation } from "@/hooks/useBackgroundAnimation";
import "../styles/games-shell.css";

export function GamesMobileLayout() {
  const isGameplay = Boolean(useMatch("/games/poker/:tableAddress"));
  const { enabled: backgroundAnimationEnabled } = useBackgroundAnimation();

  return (
    <div
      className={`games-mobile-shell ${isGameplay ? "games-mobile-shell-gameplay" : ""} ${
        backgroundAnimationEnabled ? "" : "games-mobile-shell-animation-disabled"
      }`}
    >
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
