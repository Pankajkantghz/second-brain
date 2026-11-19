import "dotenv/config";

const jwtPassword = process.env.JWT_PASSWORD;

if (!jwtPassword) {
  throw new Error("JWT_PASSWORD must be configured in the environment");
}

export const JWT_PASSWORD = jwtPassword;
