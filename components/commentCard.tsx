"use client";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Card, CardBody, Input } from "@nextui-org/react";
import { TComment } from "@/types";

interface CommentCardProps {
  comment: TComment;
  visibleComments: boolean;
}

export const CommentCard = ({ comment, visibleComments }: CommentCardProps) => {
  const [newComment, setNewComment] = useState("");
  console.log("eije", visibleComments);

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      const commentData: TComment = {
        content: newComment,
        post: comment.post,
        author: comment.author,
        createdAt: new Date(),
      };
      setNewComment("");
      console.log("commnetData", commentData);
    }
  };

  return (
    <>
      {visibleComments && (
        <Card className="mx-auto max-w-[1000px] mt-5">
          <CardBody>
            <div className="border-b py-2">
              <p>{comment.content}</p>
            </div>
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
      )}
    </>
  );
};
