import type { Instrumentation } from "next";

import { logEvent } from "@/server/observability/logger";

export const onRequestError: Instrumentation.onRequestError = (
  error,
  _request,
  context,
) => {
  const digest =
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof error.digest === "string"
      ? error.digest
      : undefined;

  logEvent("error", "request.unhandled_error", {
    correlationId: digest,
    errorCode: "unhandled_exception",
    operation: context.routeType,
    routePattern: context.routePath,
  });
};
