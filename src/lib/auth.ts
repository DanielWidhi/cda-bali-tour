import { SignJWT, jwtVerify } from "jose";

const SESSION_COOKIE = "cda_admin_session";
const secretKey = () => new TextEncoder().encode(process.env.AUTH_SECRET);

export async function createSessionToken(email: string) {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey());
}

export async function verifySessionToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return payload as { email: string };
  } catch {
    return null;
  }
}

export { SESSION_COOKIE };
