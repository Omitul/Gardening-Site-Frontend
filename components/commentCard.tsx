"use client";
import { useState } from "react";
import { Button } from "@nextui-org/button";
import { Card, CardBody, Input } from "@nextui-org/react";
import { TComment } from "@/types";
import { postComments } from "@/src/services/commentService";

interface CommentCardProps {
  comment: TComment;
  visibleComments: boolean;
}

export const CommentCard = ({ comment, visibleComments }: CommentCardProps) => {
  return (
    <>
      {visibleComments && (
        <Card className="mx-auto max-w-[1000px] mt-5">
          <CardBody>
            <div className="border-b py-2">
              <p>{comment.content}</p>
            </div>
          </CardBody>
        </Card>
      )}
    </>
  );
};
