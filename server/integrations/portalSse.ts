import type { Response } from "express";

type PortalSsePayload = { eventType: string; entityId: string };

const clients = new Set<Response>();

export function addPortalSseClient(res: Response): void {
  clients.add(res);
  res.on("close", () => {
    clients.delete(res);
  });
}

export function publishPortalProjection(payload: PortalSsePayload): void {
  const line = `data: ${JSON.stringify(payload)}\n\n`;
  for (const res of Array.from(clients)) {
    try {
      res.write(line);
    } catch {
      clients.delete(res);
    }
  }
}

export function portalSseClientCount(): number {
  return clients.size;
}
