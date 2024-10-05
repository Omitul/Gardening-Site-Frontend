"use client";
import { TComment } from "@/types";
import { revalidateTag } from "next/cache";

export const postComments = async (commentData: TComment) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      }
    );
    if (!response.ok) {
      throw new Error("failed to post");
    }

    // console.log(`${process.env.NEXT_PUBLIC_BASE_API}/api/comment`);

    const newComment = await response.json();

    console.log("new comment:", newComment);
    // if (newComment.success) {
    //   revalidateTag("comments");
    //   console.log("Revalidating...");
    // }
    return newComment;
  } catch (error) {}
};

export const getComments = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/comment/${id}`,
      {
        next: {
          tags: ["comments"],
        },
      }
    );
    const res = await response.json();
    console.log("REEEEEEEEEEEEEEEEEES", res);
    // res?.data?.sort(
    //   (a: TComment, b: TComment) =>
    //     new Date(b.createdAt as Date).getTime() -
    //     new Date(a.createdAt as Date).getTime()
    // );
    return res;
  } catch (error) {
    console.error("Failed to fetch comments:", error);
  }
};
