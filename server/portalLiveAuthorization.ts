export type LivePortalAuthorization =
  | {
      ok: true;
      role: string;
      storeRole: string;
    }
  | {
      ok: false;
      status: 401 | 403;
      error: string;
    };

export function resolveLivePortalAuthorization(user: unknown): LivePortalAuthorization {
  if (!user || typeof user !== "object") {
    return { ok: false, status: 401, error: "User account no longer exists" };
  }

  const record = user as Record<string, unknown>;
  const status = String(record.status ?? "").trim().toLowerCase();
  if (
    record.isActive === false ||
    record.disabled === true ||
    ["disabled", "inactive", "deleted", "suspended"].includes(status)
  ) {
    return { ok: false, status: 403, error: "User account is inactive" };
  }

  // Fail closed on missing authorization attributes instead of retaining stale
  // JWT claims. These defaults represent least privilege.
  return {
    ok: true,
    role: String(record.role ?? "user"),
    storeRole: String(record.storeRole ?? "public"),
  };
}
