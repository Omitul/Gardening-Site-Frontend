import { TComment } from "@/types";
import { postComments } from "@/src/services/commentService";

export const handleCommentSubmit = async (commentData: TComment) => {
  try {
    const res = await postComments(commentData);

    return res;
  } catch (error) {
    console.error("Error posting:", error);
    throw new Error("Failed to post comment");
  }
};
