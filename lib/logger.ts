export interface LogPayload {
  requestId?: string;
  platform?: string;
  operation: string;
  durationMs?: number;
  success: boolean;
  errorCategory?: string;
  details?: string;
}

export function logEvent(payload: LogPayload): void {
  const logData = {
    timestamp: new Date().toISOString(),
    requestId: payload.requestId || "N/A",
    platform: payload.platform || "unknown",
    operation: payload.operation,
    durationMs: payload.durationMs ?? 0,
    status: payload.success ? "SUCCESS" : "FAILURE",
    errorCategory: payload.errorCategory,
    details: payload.details,
  };

  // Structured JSON logging
  console.log(JSON.stringify(logData));
}
