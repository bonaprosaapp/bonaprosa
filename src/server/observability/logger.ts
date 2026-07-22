type LogLevel = "error" | "info" | "warn";

export type LogContext = Record<string, unknown>;

export type SafeLogEntry = {
  correlationId?: string;
  durationMs?: number;
  environment: string;
  errorCode?: string;
  event: string;
  level: LogLevel;
  operation?: string;
  routePattern?: string;
  status?: number;
  timestamp: string;
};

const codePattern = /^[a-z0-9][a-z0-9._-]*$/i;

function safeCode(value: unknown, maximumLength = 80) {
  if (
    typeof value !== "string" ||
    value.length === 0 ||
    value.length > maximumLength ||
    !codePattern.test(value)
  ) {
    return undefined;
  }

  return value;
}

function safeRoutePattern(value: unknown) {
  if (
    typeof value !== "string" ||
    !value.startsWith("/") ||
    value.length > 160 ||
    value.includes("?") ||
    value.includes("#") ||
    !/^\/[a-z0-9._()[\]/-]*$/i.test(value)
  ) {
    return undefined;
  }

  return value;
}

function safeDuration(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0
    ? Math.round(value)
    : undefined;
}

function safeStatus(value: unknown) {
  return typeof value === "number" && Number.isInteger(value) && value >= 100 && value <= 599
    ? value
    : undefined;
}

export function createLogEntry(
  level: LogLevel,
  event: string,
  context: LogContext = {},
): SafeLogEntry {
  const safeEvent = safeCode(event) ?? "invalid_event";
  const entry: SafeLogEntry = {
    environment: process.env.NODE_ENV ?? "unknown",
    event: safeEvent,
    level,
    timestamp: new Date().toISOString(),
  };

  const correlationId = safeCode(context.correlationId, 120);
  const durationMs = safeDuration(context.durationMs);
  const errorCode = safeCode(context.errorCode);
  const operation = safeCode(context.operation);
  const routePattern = safeRoutePattern(context.routePattern);
  const status = safeStatus(context.status);

  if (correlationId) entry.correlationId = correlationId;
  if (durationMs !== undefined) entry.durationMs = durationMs;
  if (errorCode) entry.errorCode = errorCode;
  if (operation) entry.operation = operation;
  if (routePattern) entry.routePattern = routePattern;
  if (status !== undefined) entry.status = status;

  return entry;
}

export function logEvent(
  level: LogLevel,
  event: string,
  context: LogContext = {},
) {
  const serializedEntry = JSON.stringify(createLogEntry(level, event, context));

  if (level === "error") {
    console.error(serializedEntry);
    return;
  }

  if (level === "warn") {
    console.warn(serializedEntry);
    return;
  }

  console.info(serializedEntry);
}
