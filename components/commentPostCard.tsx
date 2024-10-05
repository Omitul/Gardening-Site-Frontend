import { useState } from "react";
import { postComments } from "@/src/services/commentService";
import { Button } from "@nextui-org/button";
import { Card, CardBody, Input } from "@nextui-org/react";
import { TComment } from "@/types";

const CommentPostCard = ({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) => {
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      const commentData: TComment = {
        content: newComment,
        post: postId,
        author: userId,
        createdAt: new Date(),
      };
      setNewComment("");
      try {
        const res = await postComments(commentData);
        console.log("Comment posted ?????:", res);
      } catch (error) {
        console.error("Error posting:", error);
        throw new Error("Failed to post comment");
      }

      console.log("commentData", commentData);
    }
  };

  return (
    <div>
      <Card className="mx-auto max-w-[1000px] mt-5">
        <CardBody>
          <Input
            label="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="my-2"
          />
          <Button
            size="sm"
            variant="solid"
            onPress={handleCommentSubmit}
            className="mx-auto w-24 bg-yellow-400"
          >
            POST
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default CommentPostCard;
