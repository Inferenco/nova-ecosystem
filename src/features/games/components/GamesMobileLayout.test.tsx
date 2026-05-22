import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { GamesMobileLayout } from "./GamesMobileLayout";

vi.mock("@/components/layout/NavBar", () => ({
  NavBar: ({
    backgroundAnimationEnabled,
    onToggleBackgroundAnimation
  }: {
    backgroundAnimationEnabled?: boolean;
    onToggleBackgroundAnimation?: () => void;
  }) => (
    <nav data-testid="site-nav">
      <button type="button" onClick={onToggleBackgroundAnimation}>
        {backgroundAnimationEnabled ? "Anim Off" : "Anim On"}
      </button>
    </nav>
  )
}));

vi.mock("@/hooks/useNovaThemeBridge", () => ({
  useNovaThemeBridge: () => ({
    theme: "dark",
    setTheme: vi.fn(),
    isInNovaWallet: false
  })
}));

function renderGamesLayout(path = "/games") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/games/*" element={<GamesMobileLayout />} />
      </Routes>
    </MemoryRouter>
  );
}

describe("GamesMobileLayout", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("uses the shared background animation preference to disable games animations", () => {
    window.localStorage.setItem("background_animation_enabled", "false");

    const { container } = renderGamesLayout();

    expect(container.firstElementChild).toHaveClass("games-mobile-shell-animation-disabled");
    expect(container.querySelector("[data-testid='site-nav']")).toBeInTheDocument();
  });

  it("keeps the hub site nav available when games animations are enabled", () => {
    window.localStorage.setItem("background_animation_enabled", "true");

    const { container } = renderGamesLayout();

    expect(container.firstElementChild).not.toHaveClass("games-mobile-shell-animation-disabled");
    expect(container.querySelector("[data-testid='site-nav']")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Anim Off" })).toBeInTheDocument();
  });

  it("lets the hub animation control toggle back off", () => {
    window.localStorage.setItem("background_animation_enabled", "true");

    const { container } = renderGamesLayout();

    fireEvent.click(screen.getByRole("button", { name: "Anim Off" }));

    expect(window.localStorage.getItem("background_animation_enabled")).toBe("false");
    expect(container.firstElementChild).toHaveClass("games-mobile-shell-animation-disabled");
    expect(screen.getByRole("button", { name: "Anim On" })).toBeInTheDocument();
  });

  it("keeps the games topbar available on nested games routes when animations are disabled", () => {
    window.localStorage.setItem("background_animation_enabled", "false");

    const { container } = renderGamesLayout("/games/casino");

    expect(container.firstElementChild).toHaveClass("games-mobile-shell-animation-disabled");
    expect(container.querySelector("[data-testid='site-nav']")).not.toBeInTheDocument();
  });
});
