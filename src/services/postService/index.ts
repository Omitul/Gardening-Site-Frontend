"use server";
import axiosInstance from "@/src/lib/AxiosInstance";
import { Tpost } from "@/types";

export const Post = async (userData: Tpost) => {
  console.log(userData);
  try {
    const { data } = await axiosInstance.post("api/post", userData);
    console.log(data);

    if (data.success) {
      console.log(data?.success.message);
    }

    return data;
  } catch (error: any) {
    console.log("hoinai");
    throw new Error(error);
  }
};
