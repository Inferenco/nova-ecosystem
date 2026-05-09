import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { PokerActionDockMobile } from "./PokerActionDockMobile";
import type { PokerGameplayViewModel } from "./pokerGameplayTypes";

const noopHandlers = {
  onAbort: vi.fn(),
  onAllIn: vi.fn(),
  onCall: vi.fn(),
  onCheck: vi.fn(),
  onFold: vi.fn(),
  onPreset: vi.fn(),
  onRaise: vi.fn(),
  onRaiseInputChange: vi.fn(),
  onRevealFoldedCards: vi.fn(),
  onSitIn: vi.fn(),
  onSitOut: vi.fn(),
  onSliderChange: vi.fn(),
  onStraddle: vi.fn()
};

const baseHero = {
  seated: true,
  nickname: "Daddy Dev",
  avatarUrl: null,
  avatarBlocked: false,
  stack: 53,
  cards: [undefined, undefined],
  cardsDecrypted: false,
  isMyTurn: false,
  callAmount: 0,
  canCheck: true,
  canStraddle: false,
  inBettingRound: false,
  actionLocked: false,
  pendingActionCopy: "Waiting",
  raiseToAmount: "0",
  raiseRatio: 50,
  minRaiseTo: 0,
  maxRaiseTo: 53,
  isFolded: false,
  canRevealFolded: false,
  hasRevealedFolded: false
};

function renderDock(heroOverrides: Partial<PokerGameplayViewModel["hero"]> = {}) {
  const viewModel = {
    hero: {
      ...baseHero,
      ...heroOverrides
    }
  } as unknown as PokerGameplayViewModel;

  render(
    <PokerActionDockMobile
      viewModel={viewModel}
      compact={false}
      onAvatarError={vi.fn()}
      {...noopHandlers}
    />
  );
}

describe("PokerActionDockMobile", () => {
  it("keeps passive table controls visible without duplicating the waiting state", () => {
    renderDock();

    expect(screen.queryByText("Waiting")).not.toBeInTheDocument();

    for (const buttonName of [
      "MIN",
      "50%",
      "MAX",
      "Fold",
      "Check",
      "Raise",
      "All-in (53)",
      "Straddle",
      "Sit Out",
      "Sit In",
      "Abort"
    ]) {
      expect(screen.getByRole("button", { name: buttonName })).toBeInTheDocument();
    }
  });

  it("still shows actionable pending copy when the state is not the default waiting label", () => {
    renderDock({ pendingActionCopy: "Confirming action" });

    expect(screen.getByText("Confirming action")).toHaveClass("poker-gameplay-dock-pending");
  });

  it("keeps the reveal folded cards action even when the passive waiting label is hidden", () => {
    renderDock({ canRevealFolded: true });

    expect(screen.getByRole("button", { name: "Reveal Cards" })).toBeInTheDocument();
    expect(screen.queryByText("Waiting")).not.toBeInTheDocument();
  });
});
