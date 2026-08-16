/**
 * Court QR token helpers (HMAC stub).
 * Wire secrets from courts.qr_secret when claim API lands.
 */

export type CourtQrPayload = {
  courtId: string;
  /** unix seconds */
  exp?: number;
};

export function encodeCourtQrPayload(payload: CourtQrPayload): string {
  return Buffer.from(JSON.stringify(payload)).toString("base64url");
}

export function decodeCourtQrPayload(token: string): CourtQrPayload {
  const json = Buffer.from(token, "base64url").toString("utf8");
  return JSON.parse(json) as CourtQrPayload;
}
