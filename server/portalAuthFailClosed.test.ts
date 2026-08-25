import { describe, expect, it, vi, beforeEach } from "vitest";
import jwt from "jsonwebtoken";

vi.mock("./portalAuthStore", async () => {
  const actual = await vi.importActual<typeof import("./portalAuthStore")>("./portalAuthStore");
  return {
    ...actual,
    getUser: vi.fn(),
  };
});

vi.mock("./portalOrg", async () => {
  const actual = await vi.importActual<typeof import("./portalOrg")>("./portalOrg");
  return {
    ...actual,
    findUserById: vi.fn(),
  };
});

process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret-for-fail-closed-auth-test";

describe("portal authMiddleware fails closed when no live user record exists", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("denies a validly-signed JWT whose user has no live record", async () => {
    const { authMiddleware } = await import("./routes");
    const { getUser } = await import("./portalAuthStore");
    const { findUserById } = await import("./portalOrg");
    (getUser as any).mockReturnValue(undefined);
    (findUserById as any).mockReturnValue(undefined);

    const token = jwt.sign(
      { userId: "ghost-user", email: "ghost@example.com", role: "admin", storeRole: "admin" },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" },
    );

    const req: any = { headers: { authorization: `Bearer ${token}` }, cookies: {} };
    let statusCode: number | undefined;
    let body: any;
    const res: any = {
      status(code: number) {
        statusCode = code;
        return this;
      },
      json(payload: any) {
        body = payload;
        return this;
      },
    };
    const next = vi.fn();

    authMiddleware(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(statusCode).toBe(401);
    expect(body?.error).toBeTruthy();
    expect(req.user).toBeUndefined();
  });

  it("still authorizes when a live, non-disabled record exists", async () => {
    const { authMiddleware } = await import("./routes");
    const { getUser } = await import("./portalAuthStore");
    const { findUserById } = await import("./portalOrg");
    (getUser as any).mockReturnValue({
      id: "u1",
      email: "real@example.com",
      role: "admin",
      storeRole: "admin",
      clientId: null,
    });
    (findUserById as any).mockReturnValue(undefined);

    const token = jwt.sign(
      { userId: "u1", email: "real@example.com", role: "user", storeRole: "prospect" },
      process.env.JWT_SECRET as string,
      { expiresIn: "24h" },
    );

    const req: any = { headers: { authorization: `Bearer ${token}` }, cookies: {} };
    const res: any = {
      status() {
        return this;
      },
      json() {
        return this;
      },
    };
    const next = vi.fn();

    authMiddleware(req, res, next);

    expect(next).toHaveBeenCalled();
    // Live record wins over stale token claims (role/storeRole).
    expect(req.user.role).toBe("admin");
    expect(req.user.storeRole).toBe("admin");
  });
});
