import { useEffect, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { GAME_PHASES, PHASE_NAMES } from "../../config/games";
import { PokerGameInfoRow } from "./PokerGameInfoRow";
import { PokerGameplayHeader } from "./PokerGameplayHeader";
import { PokerGameplayStatusBar } from "./PokerGameplayStatusBar";
import { PokerActionDockMobile } from "./PokerActionDockMobile";
import { derivePokerMobileViewportBuckets } from "./pokerGameplayLayout";
import type { PokerGameplayLayoutProps } from "./pokerGameplayTypes";
import { PokerTableStageMobile } from "./PokerTableStageMobile";

function getVisibleViewportSize() {
  if (typeof window === "undefined") {
    return { width: 390, height: 844 };
  }

  const viewport = window.visualViewport;

  return {
    width: Math.round(viewport?.width ?? window.innerWidth),
    height: Math.round(viewport?.height ?? window.innerHeight)
  };
}

export function MobilePokerGameplayLayout({
  viewModel,
  failedAvatarUrls,
  onAvatarError,
  onAbort,
  onAllIn,
  onCall,
  onCheck,
  onFold,
  onJoinSeat,
  onLeaveTable,
  onPreset,
  onRaise,
  onRaiseInputChange,
  onRevealFoldedCards,
  onSitIn,
  onSitOut,
  onSliderChange,
  onStartHand,
  onStraddle,
  onTimeout,
  onToggleChat,
  onToggleOwnerPanel
}: PokerGameplayLayoutProps) {
  const firstJoinableSeat =
    viewModel.tableSeats.find(({ seat }) => !seat.playerAddress || seat.playerAddress === "0x0")
      ?.actualSeatIndex ?? 0;
  const [buckets, setBuckets] = useState(() =>
    derivePokerMobileViewportBuckets(getVisibleViewportSize().width, getVisibleViewportSize().height)
  );
  const [availableHeight, setAvailableHeight] = useState(() => getVisibleViewportSize().height);

  useEffect(() => {
    if (buckets.scrollable) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [buckets.scrollable]);

  useEffect(() => {
    const updateBuckets = () => {
      const viewport = getVisibleViewportSize();
      setAvailableHeight(viewport.height);
      setBuckets(derivePokerMobileViewportBuckets(viewport.width, viewport.height));
    };

    updateBuckets();
    window.addEventListener("resize", updateBuckets);
    window.visualViewport?.addEventListener("resize", updateBuckets);

    return () => {
      window.removeEventListener("resize", updateBuckets);
      window.visualViewport?.removeEventListener("resize", updateBuckets);
    };
  }, []);

  const shellStyle = {
    "--poker-mobile-available-height": `${availableHeight}px`
  } as CSSProperties;
  const handStateClass =
    viewModel.table.phase === GAME_PHASES.WAITING ? "is-waiting-hand" : "is-active-hand";

  return (
    <div
      className={`poker-gameplay-shell poker-gameplay-shell-mobile ${buckets.widthBucket} ${buckets.heightBucket} ${
        buckets.compact ? "is-compact" : ""
      } ${buckets.scrollable ? "is-scrollable" : ""} ${handStateClass}`}
      style={shellStyle}
    >
      <div className="poker-gameplay-mobile-grid">
        <PokerGameplayHeader
          tableName={viewModel.table.name}
          blindsLabel={viewModel.table.blindsLabel}
          unreadCount={viewModel.chat.unreadCount}
          showChat={viewModel.overlays.showChat}
          isAdmin={viewModel.session.isAdmin}
          onToggleChat={onToggleChat}
          onToggleControls={onToggleOwnerPanel}
        />

        <PokerGameplayStatusBar
          statusMessage={viewModel.table.statusMessage}
          isMyTurn={viewModel.hero.isMyTurn}
          canTimeout={viewModel.table.canTimeout}
          timeoutPending={viewModel.table.timeoutPending}
          onTimeout={onTimeout}
        />

        <div className="poker-gameplay-mobile-stage-wrap">
          <PokerTableStageMobile
            viewModel={viewModel}
            failedAvatarUrls={failedAvatarUrls}
            onAvatarError={onAvatarError}
            onJoinSeat={onJoinSeat}
            compact={buckets.compact}
          />
        </div>

        <PokerGameInfoRow
          timer={viewModel.table.timerText}
          phaseLabel={PHASE_NAMES[viewModel.table.phase] || viewModel.table.phaseLabel}
          handLabel={viewModel.table.handNumberLabel}
          isUrgent={viewModel.table.timerUrgent}
        />

        <div className="poker-gameplay-mobile-dock-wrap">
          {viewModel.hero.seated ? (
            <>
              {viewModel.table.phase === GAME_PHASES.WAITING ? (
                <div className="poker-gameplay-mobile-waiting-row">
                  <button
                    type="button"
                    className="poker-gameplay-action-button start"
                    disabled={!viewModel.controls.canStartHand}
                    onClick={onStartHand}
                  >
                    Start Hand
                  </button>
                  <button
                    type="button"
                    className="poker-gameplay-action-button leave"
                    onClick={onLeaveTable}
                  >
                    Leave
                  </button>
                </div>
              ) : null}

              <PokerActionDockMobile
                viewModel={viewModel}
                compact={buckets.compact}
                onAvatarError={onAvatarError}
                onAbort={onAbort}
                onAllIn={onAllIn}
                onCall={onCall}
                onCheck={onCheck}
                onFold={onFold}
                onPreset={onPreset}
                onRaise={onRaise}
                onRaiseInputChange={onRaiseInputChange}
                onRevealFoldedCards={onRevealFoldedCards}
                onSitIn={onSitIn}
                onSitOut={onSitOut}
                onSliderChange={onSliderChange}
                onStraddle={onStraddle}
              />
            </>
          ) : (
            <div className="poker-gameplay-mobile-idle-dock">
              <button
                type="button"
                className="poker-gameplay-action-button start"
                disabled={!viewModel.controls.canJoinTable}
                onClick={() => onJoinSeat(firstJoinableSeat)}
              >
                {viewModel.controls.joinButtonLabel}
              </button>
              <Link className="poker-gameplay-action-button leave poker-gameplay-idle-link" to="/games/poker">
                Back to Lobby
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
