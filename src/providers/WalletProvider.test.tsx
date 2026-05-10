import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserResponseStatus } from "@cedra-labs/wallet-standard";
import { WalletProvider, useWallet } from "./WalletProvider";

const connectMock = vi.fn();
const accountMock = vi.fn();
const networkMock = vi.fn();
const disconnectMock = vi.fn();

const account = {
  address: { toString: () => "0xabc123" }
};

const network = {
  name: "testnet",
  chainId: 2,
  url: "https://testnet.cedra.dev/v1"
};

const wallet = {
  name: "Zedra",
  icon: null,
  features: {
    "cedra:connect": {
      connect: connectMock
    },
    "cedra:account": {
      account: accountMock
    },
    "cedra:network": {
      network: networkMock
    },
    "cedra:disconnect": {
      disconnect: disconnectMock
    }
  }
};

vi.mock("@cedra-labs/wallet-adapter-core", () => {
  class WalletCore {
    wallets = [wallet];
    wallet: unknown = null;
    account: unknown = null;
    network: unknown = null;

    on = vi.fn();
    off = vi.fn();
    setWallet(nextWallet: unknown) {
      this.wallet = nextWallet;
    }
    setAccount(nextAccount: unknown) {
      this.account = nextAccount;
    }
    setNetwork(nextNetwork: unknown) {
      this.network = nextNetwork;
    }
    async connect(walletName: string) {
      const response = await connectMock(walletName);
      this.wallet = wallet;
      this.account = response.args;
      this.network = network;
      return undefined;
    }
    async disconnect() {
      return undefined;
    }
    async signAndSubmitTransaction() {
      return { hash: "0xhash" };
    }
  }

  return { WalletCore };
});

function WalletStateProbe() {
  const walletState = useWallet();

  return (
    <div>
      <span data-testid="status">
        {walletState.connected ? "connected" : "disconnected"}
      </span>
      <span data-testid="address">
        {walletState.account?.address.toString() ?? "none"}
      </span>
      <span data-testid="connecting">
        {walletState.connecting ? "connecting" : "idle"}
      </span>
      <span data-testid="wallet-count">{walletState.wallets.length}</span>
      <button type="button" onClick={() => void walletState.connect("Zedra")}>
        Connect Zedra
      </button>
      <button type="button" onClick={() => void walletState.disconnect()}>
        Disconnect
      </button>
    </div>
  );
}

describe("WalletProvider", () => {
  beforeEach(() => {
    window.localStorage.clear();
    accountMock.mockResolvedValue(account);
    connectMock.mockResolvedValue({ status: UserResponseStatus.APPROVED, args: account });
    networkMock.mockResolvedValue(network);
    disconnectMock.mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("restores the visible wallet session from local cache after refresh", async () => {
    window.localStorage.setItem(
      "nova_wallet_session",
      JSON.stringify({
        walletName: "Zedra",
        address: "0xabc123",
        network
      })
    );

    render(
      <WalletProvider>
        <WalletStateProbe />
      </WalletProvider>
    );

    expect(screen.getByTestId("wallet-count")).toHaveTextContent("1");

    await waitFor(() => {
      expect(screen.getByTestId("status")).toHaveTextContent(/^connected$/);
    });
    expect(screen.getByTestId("address")).toHaveTextContent("0xabc123");
    expect(screen.getByTestId("connecting")).toHaveTextContent(/^idle$/);
    expect(accountMock).not.toHaveBeenCalled();
    expect(connectMock).not.toHaveBeenCalled();
  });

  it("does not call the wallet extension on refresh without a cached session", async () => {
    window.localStorage.setItem("CedraWalletName", "Zedra");

    render(
      <WalletProvider>
        <WalletStateProbe />
      </WalletProvider>
    );

    expect(screen.getByTestId("status")).toHaveTextContent(/^disconnected$/);
    expect(screen.getByTestId("connecting")).toHaveTextContent(/^idle$/);
    expect(accountMock).not.toHaveBeenCalled();
    expect(connectMock).not.toHaveBeenCalled();
  });

  it("caches the wallet session after an explicit connect", async () => {
    window.localStorage.setItem("CedraWalletName", "Zedra");
    const user = userEvent.setup();

    render(
      <WalletProvider>
        <WalletStateProbe />
      </WalletProvider>
    );

    await user.click(screen.getByRole("button", { name: "Connect Zedra" }));

    await waitFor(() => {
      expect(screen.getByTestId("status")).toHaveTextContent(/^connected$/);
    });

    expect(connectMock).toHaveBeenCalledWith("Zedra");
    expect(window.localStorage.getItem("nova_wallet_session")).toContain("0xabc123");
  });

  it("clears the cached session on disconnect", async () => {
    window.localStorage.setItem(
      "nova_wallet_session",
      JSON.stringify({
        walletName: "Zedra",
        address: "0xabc123",
        network
      })
    );

    render(
      <WalletProvider>
        <WalletStateProbe />
      </WalletProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("status")).toHaveTextContent(/^connected$/);
    });

    await userEvent.click(screen.getByRole("button", { name: "Disconnect" }));

    await waitFor(() => {
      expect(screen.getByTestId("status")).toHaveTextContent(/^disconnected$/);
    });
    expect(window.localStorage.getItem("nova_wallet_session")).toBeNull();
  });
});
