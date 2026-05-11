import type {
  EditRequestPayload,
  EventRecord,
  EventsFeesConfig,
  PendingEventRecord,
  SubmitEventInput,
  TxResult
} from "./types";

// Mock mock wallet address
const MOCK_WALLET_ADDRESS = `0x${"67e3f94a".repeat(8)}`;

// Mock event data
const mockEvents: EventRecord[] = [
  {
    id: "1",
    submitter: MOCK_WALLET_ADDRESS,
    title: "Test Event 1",
    description: "This is a test event",
    category: "General",
    imageUrl: "",
    eventUrl: "",
    startTimestamp: 1700000000,
    endTimestamp: 1700003600,
    isTba: false,
    status: "Upcoming"
  },
  {
    id: "2",
    submitter: MOCK_WALLET_ADDRESS,
    title: "Test Event 2",
    description: "This is another test event",
    category: "General",
    imageUrl: "",
    eventUrl: "",
    startTimestamp: 1700010000,
    endTimestamp: 1700013600,
    isTba: false,
    status: "Upcoming"
  }
];

// Mock pending events - will be populated by submitEvent
const mockPendingEvents: PendingEventRecord[] = [
  {
    pendingId: "1",
    submitter: MOCK_WALLET_ADDRESS,
    title: "Pending Event 1",
    description: "This is a pending test event",
    category: "General",
    imageUrl: "",
    eventUrl: "",
    startTimestamp: 1700020000,
    endTimestamp: 1700023600,
    isTba: false,
    escrowAmount: BigInt(100000000),
    submittedAt: 1700000000
  }
];

// State for dynamically added events
const dynamicPendingEvents: PendingEventRecord[] = [];

export function mockGetEvents(limit: number, offset: number): EventRecord[] {
  return mockEvents.slice(offset, offset + limit);
}

export function mockGetUserEvents(userAddress: string, limit: number, offset: number): EventRecord[] {
  return mockEvents.filter((e) => e.submitter === userAddress).slice(offset, offset + limit);
}

export function mockGetUserPendingEvents(userAddress: string, limit: number, offset: number): PendingEventRecord[] {
  const allPending = [...mockPendingEvents, ...dynamicPendingEvents];
  return allPending.filter((e) => e.submitter === userAddress).slice(offset, offset + limit);
}

export function mockGetFeeConfig(): EventsFeesConfig {
  return {
    minEscrowFee: BigInt(100000000),
    approvalFeePercent: 10,
    rejectionFeePercent: 5
  };
}

export function mockSubmitEvent(
   
  _accountAddress: string,
  input: SubmitEventInput
): TxResult {
  // Add submitted event to dynamic pending events list
  const newEvent: PendingEventRecord = {
    pendingId: String(dynamicPendingEvents.length + mockPendingEvents.length + 1),
    submitter: MOCK_WALLET_ADDRESS,
    title: input.title,
    description: input.description,
    category: input.category,
    imageUrl: input.imageUrl || "",
    eventUrl: input.eventUrl || "",
    startTimestamp: input.isTba ? 0 : input.startTimestamp,
    endTimestamp: input.isTba ? 0 : input.endTimestamp,
    isTba: input.isTba,
    escrowAmount: input.escrowAmount,
    submittedAt: Math.floor(Date.now() / 1000)
  };
  dynamicPendingEvents.push(newEvent);
  return { hash: `0xmocktx_${Date.now()}`, explorerUrl: "https://cedrascan.com/txn/0xmocktx" };
}

export function mockCancelPendingEvent(
   
  _accountAddress: string,
  pendingId: string
): TxResult {
  return { hash: `0xmockcancel_${pendingId}`, explorerUrl: "https://cedrascan.com/txn/0xmockcancel" };
}

export function mockCancelLiveEvent(
   
  _accountAddress: string,
  eventId: string
): TxResult {
  return { hash: `0xmockcancellive_${eventId}`, explorerUrl: "https://cedrascan.com/txn/0xmockcancellive" };
}

export function mockSubmitEditRequest(
   
  _accountAddress: string,
  payload: EditRequestPayload
): TxResult {
  return { hash: `0xmockedit_${payload.eventId}`, explorerUrl: "https://cedrascan.com/txn/0xmockedit" };
}
