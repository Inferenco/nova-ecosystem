import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles/tokens.css";
import "./styles/global.css";

// Register Nova Connect wallet via AIP-62 Wallet-Standard with dynamic websiteUrl
import { registerNovaWallet } from "@inferenco/nova-wallet-adapter/aip62";

function getWebsiteUrl(): string {
  if (typeof window !== "undefined") {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isMobile = /android|iphone|ipad|ipod|mobile/i.test(userAgent);
    return isMobile ? "https://inferenco.com/nova-wallet" : "https://inferenco.com/nova-desk";
  }
  return "https://inferenco.com/nova-desk";
}

// Register with dynamic websiteUrl based on device type
registerNovaWallet({
  forceRegistration: true,
  websiteUrl: getWebsiteUrl(),
  desktopRegistration: true,
  detectAliases: true,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
