"use server";
import axiosInstance from "@/src/lib/AxiosInstance";
import { Tpost } from "@/types";
import { revalidateTag } from "next/cache";

export const Post = async (Postdata: Tpost) => {
  // console.log(Postdata);
  try {
    const { data } = await axiosInstance.post("api/post", Postdata);
    console.log(data);

    if (data.success) {
      revalidateTag("posts");
      // console.log(
      //   "hoiseeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"
      // );
      // console.log(data?.success.message);
    } else {
      console.log("Success flag is false, no message to display.");
    }
    console.log("postData", data);
    return data;
  } catch (error: any) {
    console.log("Error occurred:", error.message || error);
    throw new Error(error);
  }
};

export const UpdatePost = async (Postdata: Partial<Tpost>, postId: string) => {
  console.log(Postdata);
  try {
    const { data } = await axiosInstance.put(`api/post/${postId}`, Postdata);
    // console.log("updated:------", data);

    return data;
  } catch (error: any) {
    console.log("Error occurred:", error.message || error);
    throw new Error(error);
  }
};

export async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/post`, {
    next: {
      tags: ["posts"],
    },
  });

  const data = await res.json();
  data.data.sort(
    (a: Tpost, b: Tpost) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return data;
}

export async function getPostById(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/post/${id}`,
      {
        next: {
          tags: ["posts"],
        },
      }
    );
    const data = await res.json();
    // console.log("data", data);
    return data;
  } catch (error: any) {
    console.log("Error occurred:", error.message || error);
    throw new Error(error);
  }
}

export async function deletePost(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/post/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    // console.log("post deleted resposne", data);
    return data;
  } catch (error: any) {
    console.log("Error occurred:", error.message || error);
    throw new Error(error);
  }
}
