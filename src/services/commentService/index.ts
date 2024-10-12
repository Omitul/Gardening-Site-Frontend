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
    // console.log("REEEEEEEEEEEEEEEEEES", res);
    // res?.data?.sort((a: TComment, b: TComment) => {
    //   const dateA = new Date(a.createdAt as Date);
    //   const dateB = new Date(b.createdAt as Date);
    //   dateA.getTime() - dateB.getTime();
    // });
    return res;
  } catch (error) {
    console.error("Failed to fetch comments:", error);
  }
};

export const deleteComment = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/comment/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await response.json();
    console.log("response of delete", res);
    return res;
  } catch (error) {
    console.error("Failed to delete comment:", error);
  }
};

export const updateComment = async (id: string, payload: Partial<TComment>) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/api/comment/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const res = await response.json();
    // console.log("response of update", res);
    return res;
  } catch (error) {
    console.error("Failed to delete comment:", error);
  }
};
