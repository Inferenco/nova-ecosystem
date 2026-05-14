import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { GamesMobileLayout } from "./GamesMobileLayout";

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
  });

  it("keeps games animations enabled when the shared preference is enabled", () => {
    window.localStorage.setItem("background_animation_enabled", "true");

    const { container } = renderGamesLayout();

    expect(container.firstElementChild).not.toHaveClass("games-mobile-shell-animation-disabled");
  });
});
