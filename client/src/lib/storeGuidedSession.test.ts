import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  EMPTY_GUIDED_SESSION,
  isGuidedFullCatalog,
  isWorkEmail,
  markGuidedCompleted,
  markGuidedSkipped,
  parseCatalogSearchParam,
  readGuidedSession,
  startStoreBuyerAuth,
  writeGuidedSession,
} from "./storeGuidedSession";
import { DEFAULT_GUIDED_ANSWERS } from "@/data/storeMerchandising";

function installMemoryStorage() {
  const store = new Map<string, string>();
  const localStorage = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
    clear: () => store.clear(),
    get length() {
      return store.size;
    },
    key: (index: number) => Array.from(store.keys())[index] ?? null,
  };
  vi.stubGlobal("window", { localStorage });
  vi.stubGlobal("localStorage", localStorage);
}

describe("store guided session", () => {
  beforeEach(() => {
    installMemoryStorage();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("treats the default path as guided, not full catalog", () => {
    expect(parseCatalogSearchParam("")).toBe(false);
    expect(parseCatalogSearchParam("outcome=protect")).toBe(false);
    expect(isGuidedFullCatalog("")).toBe(false);
    expect(readGuidedSession()).toBeNull();
  });

  it("skip / catalog=full reveals the full catalog", () => {
    expect(parseCatalogSearchParam("catalog=full")).toBe(true);
    expect(parseCatalogSearchParam("?catalog=full&outcome=protect")).toBe(true);
    markGuidedSkipped();
    expect(isGuidedFullCatalog("")).toBe(true);
  });

  it("captures work email without requiring a portal login page", async () => {
    expect(isWorkEmail("not-an-email")).toBe(false);
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: RequestInfo) => {
        const url = String(input);
        if (url.includes("/api/portal/me")) {
          return new Response(JSON.stringify({}), { status: 401 });
        }
        if (url.includes("/api/portal/auth/zoho/status")) {
          return new Response(JSON.stringify({ configured: true }), { status: 200 });
        }
        return new Response("{}", { status: 404 });
      }),
    );

    const started = await startStoreBuyerAuth("Ops@Acme.com");
    expect(started.captured).toBe(true);
    expect(started.sessionPresent).toBe(false);
    expect(started.zohoConfigured).toBe(true);

    const session = readGuidedSession();
    expect(session?.workEmail).toBe("ops@acme.com");
    expect(session?.authStarted).toBe(true);
    expect(window.localStorage.getItem("userEmail")).toBe("ops@acme.com");
  });

  it("persists completed answers for the recommended set", () => {
    const session = markGuidedCompleted({
      ...DEFAULT_GUIDED_ANSWERS,
      workEmail: "cfo@firm.com",
    });
    expect(session.completed).toBe(true);
    expect(session.skipped).toBe(false);
    expect(writeGuidedSession({}).answers.buyerType).toBe("prospect");
    expect(EMPTY_GUIDED_SESSION.completed).toBe(false);
  });
});
