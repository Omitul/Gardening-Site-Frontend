import axiosInstance from "@/src/lib/AxiosInstance";
import { TComment } from "@/types";

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
      throw new Error("Failed to post comment");
    }

    const newComment: TComment = await response.json();
    return newComment; // Return the posted comment
  } catch (error) {
    throw new Error("Failed to post comment");
  }
};

export const getComments = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/api/comments/${id}`);
    const data = response.data;
    return data;
  } catch (error) {
    console.error("Failed to fetch comments:", error);
  }
};
