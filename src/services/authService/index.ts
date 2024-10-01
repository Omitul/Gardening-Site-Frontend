"use server";

import { cookies } from "next/headers";
import axiosInstance from "@/src/lib/AxiosInstance";
type LoginData = {
  email: string;
  password: string;
};

export const loginUser = async (userData: LoginData) => {
  console.log(userData);
  try {
    const { data } = await axiosInstance.post("api/auth/login", userData);
    console.log(data);

    if (data.success) {
      console.log(data?.token);
      cookies().set("accessToken", data?.token);
    }

    return data;
  } catch (error: any) {
    console.log("hoinai");
    throw new Error(error);
  }
};

export const logout = () => {
  cookies().delete("accessToken");
};
