import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "background_animation_enabled";

function getDefaultAnimationState(): boolean {
  if (typeof window === "undefined") return true;

  const platform = window.navigator.platform.toLowerCase();
  const userAgent = window.navigator.userAgent.toLowerCase();

  // Linux detection
  if (platform.includes("linux") || userAgent.includes("linux")) {
    return false;
  }
  // Windows detection
  if (platform.includes("win") || userAgent.includes("windows")) {
    return true;
  }
  // Mac detection
  if (
    platform.includes("mac") ||
    userAgent.includes("macintosh") ||
    userAgent.includes("mac os x")
  ) {
    return true;
  }
  // Default to enabled for unknown platforms
  return true;
}

function getStoredPreference(): boolean | null {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === null) return null;
  return stored === "true";
}

export function useBackgroundAnimation(): {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
  toggle: () => void;
} {
  const [enabled, setEnabledState] = useState<boolean>(() => {
    const stored = getStoredPreference();
    if (stored !== null) return stored;
    return getDefaultAnimationState();
  });

  const setEnabled = useCallback((value: boolean) => {
    setEnabledState(value);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, String(value));
    }
  }, []);

  const toggle = useCallback(() => {
    setEnabled(!enabled);
  }, [enabled, setEnabled]);

  // Sync with localStorage changes from other tabs
  useEffect(() => {
    if (typeof window === "undefined") return;

    function handleStorageChange(event: StorageEvent) {
      if (event.key === STORAGE_KEY) {
        setEnabledState(event.newValue === "true");
      }
    }

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return { enabled, setEnabled, toggle };
}
