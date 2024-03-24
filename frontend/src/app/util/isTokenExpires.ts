"use server";
import jwt, { JwtPayload } from "jsonwebtoken";

const isTokenExpired = (accessToken: string) => {
  const decodedToken = accessToken && (jwt.decode(accessToken) as JwtPayload);

  if (decodedToken && decodedToken.exp) {
    return decodedToken.exp < Date.now() / 1000;
  }
};

export default isTokenExpired;
