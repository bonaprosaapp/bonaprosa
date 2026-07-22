import { describe, expect, it } from "vitest";

import { createLogEntry } from "./logger";

describe("createLogEntry", () => {
  it("mantém somente campos permitidos e aceita apenas padrões de rota", () => {
    const entry = createLogEntry("error", "checkout.failed", {
      correlationId: "req-123",
      durationMs: 12.6,
      errorCode: "provider_timeout",
      operation: "create_checkout",
      routePattern: "/app/tentativas/[attemptId]/resultado",
      status: 502,
      token: "não-pode-aparecer",
      transcript: "dado pessoal",
    });

    expect(entry).toMatchObject({
      correlationId: "req-123",
      durationMs: 13,
      errorCode: "provider_timeout",
      event: "checkout.failed",
      level: "error",
      operation: "create_checkout",
      routePattern: "/app/tentativas/[attemptId]/resultado",
      status: 502,
    });
    expect(entry).not.toHaveProperty("token");
    expect(entry).not.toHaveProperty("transcript");
  });

  it("substitui eventos livres e descarta valores fora do contrato", () => {
    const entry = createLogEntry("warn", "e-mail do usuário", {
      durationMs: -1,
      routePattern: "/api/checkout?token=segredo",
      status: 999,
    });

    expect(entry.event).toBe("invalid_event");
    expect(entry).not.toHaveProperty("durationMs");
    expect(entry).not.toHaveProperty("routePattern");
    expect(entry).not.toHaveProperty("status");
    expect(Number.isNaN(Date.parse(entry.timestamp))).toBe(false);
  });
});
