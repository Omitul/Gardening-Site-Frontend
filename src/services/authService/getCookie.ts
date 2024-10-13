"use server";
import { cookies } from "next/headers";

export const getAccessToken = () => {
  const cookie = cookies();
  const accessToken = cookie.get("accessToken");

  let tokenValue;

  if (typeof accessToken === "object" && accessToken !== null) {
    tokenValue = accessToken.value;
  } else {
    tokenValue = undefined;
  }

  //   console.log("accessToken value:", tokenValue);
  return tokenValue;
};
