import { NOVA_CONNECT_NAME } from "@inferenco/nova-wallet-adapter";

export const NOVA_CONNECT_CONFIG = {
  bridgeBaseUrl: import.meta.env.VITE_NOVA_BRIDGE_URL || "http://127.0.0.1:21984",
  relayBaseUrl: import.meta.env.VITE_NOVA_RELAY_URL || "https://nova-service-160604102004.europe-west1.run.app",
  deeplinkScheme: "inferenco",
} as const;

export { NOVA_CONNECT_NAME };
