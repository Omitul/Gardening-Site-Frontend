"use server";

import jwt, { JwtPayload } from "jsonwebtoken";

import envConfig from "../config/envConfig";
import { getAccessToken } from "../services/authService/getCookie";

export const getDecodedData = async () => {
  const token = (await getAccessToken()) as string;
  // console.log("TOKEN:", token);

  if (!token) {
    return undefined;
  }

  const decoded = jwt.verify(
    token,
    envConfig.jwt_access_secret as string,
  ) as JwtPayload;

  return decoded;
};
