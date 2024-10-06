"use client";
import { Card, CardBody } from "@nextui-org/react";
import { TComment } from "@/types";

interface CommentCardProps {
  comment: TComment;
  visibleComments: boolean;
}

export const CommentCard = ({ comment, visibleComments }: CommentCardProps) => {
  return (
    <>
      {visibleComments && comment.content ? (
        <Card className="mx-auto max-w-[1000px] mt-5">
          <CardBody>
            <div className="border-b py-2">
              <p>{comment.content}</p>
            </div>
          </CardBody>
        </Card>
      ) : null}
    </>
  );
};
