import { Network } from "@cedra-labs/ts-sdk";
import type { NetworkInfo } from "@cedra-labs/wallet-adapter-core";
import { appEnv, type CedraNetwork } from "./env";

export { type CedraNetwork };

export interface ChainConfig {
  id: "cedra";
  label: string;
  network: Network;
  networkName: CedraNetwork;
  rpcUrl: string;
  indexerUrl: string;
  walletContractAddress: string;
  gameContractAddress: string;
  gamesWalletContractAddress: string;
  gamesIndexerUrl: string;
  tokenSymbol: string;
  tokenDecimals: number;
}

// Map CedraNetwork string to Network enum
function mapNetwork(network: CedraNetwork): Network {
  switch (network) {
    case "testnet":
      return Network.TESTNET;
    case "devnet":
      return Network.DEVNET;
    case "mainnet":
      return Network.MAINNET;
    default:
      return Network.TESTNET;
  }
}

export const CHAIN_CONFIG: ChainConfig = {
  id: "cedra",
  label: `Cedra ${appEnv.cedraNetwork.charAt(0).toUpperCase() + appEnv.cedraNetwork.slice(1)}`,
  network: mapNetwork(appEnv.cedraNetwork),
  networkName: appEnv.cedraNetwork,
  rpcUrl: appEnv.fullnodeUrl,
  indexerUrl: appEnv.indexerUrl,
  walletContractAddress: appEnv.walletContractAddress,
  gameContractAddress: appEnv.gameContractAddress,
  gamesWalletContractAddress: appEnv.gamesWalletContractAddress,
  gamesIndexerUrl: appEnv.gamesIndexerUrl,
  tokenSymbol: "CEDRA",
  tokenDecimals: 8
};

export function isExpectedNetwork(network: NetworkInfo | null): boolean {
  if (!network) return false;

  const candidates = [
    String((network as { name?: unknown }).name ?? ""),
    String((network as { chainId?: unknown }).chainId ?? ""),
    String((network as { url?: unknown }).url ?? "")
  ]
    .filter(Boolean)
    .map((value) => value.toLowerCase());

  return candidates.some((value) => value.includes(CHAIN_CONFIG.networkName));
}
