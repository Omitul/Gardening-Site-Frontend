"use client";
import { TComment } from "@/types";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import React, { useState } from "react";

const SubmitComment = ({ comment }: { comment: TComment }) => {
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      const [newComment, setNewComment] = useState("hello");
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

export default SubmitComment;
