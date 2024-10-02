"use server";
import axiosInstance from "@/src/lib/AxiosInstance";
import { getDecodedData } from "@/src/lib/jwtDecode";
import { LoginData, registerData } from "@/types";
import { cookies } from "next/headers";

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

export const registerUser = async (userData: registerData) => {
  console.log(userData);
  try {
    const { data } = await axiosInstance.post("api/user/register", userData);
    console.log(data);

    if (data.success) {
      console.log(data.success.message);
    }

    return data;
  } catch (error: any) {
    console.log("hoinai");
    throw new Error(error);
  }
};

export const getUser = async () => {
  const { userId } = await getDecodedData();
  console.log("UserId", userId);
  const { data } = await axiosInstance.get(`api/user/${userId}`);
  console.log("data etai:", data?.data);
  return data?.data;
};

export const logout = () => {
  cookies().delete("accessToken");
};
