"use client";
import { Button, Card, CardBody, Input } from "@nextui-org/react";
import React, { useState } from "react";

import { TComment } from "@/types";

const SubmitComment = ({ comment }: { comment: TComment }) => {
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      const commentData: TComment = {
        content: newComment,
        post: comment.post,
        author: comment.author,
        createdAt: new Date(),
      };

      setNewComment("");
      // console.log("commnetData", commentData);
    }
  };

  return (
    <div>
      <Card className="mx-auto max-w-[1000px] mt-5">
        <CardBody>
          <Input
            className="my-2"
            label="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button
            className="mx-auto w-24 bg-yellow-400"
            size="sm"
            variant="solid"
            onPress={handleCommentSubmit}
          >
            POST
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default SubmitComment;
