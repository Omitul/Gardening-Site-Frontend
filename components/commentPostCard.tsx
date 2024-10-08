import { startTransition, useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import { Card, CardBody, Input } from "@nextui-org/react";
import { TComment } from "@/types";
import { handleCommentSubmit } from "./handleCommentSubmit";
import { useRouter } from "next/navigation";
const CommentPostCard = ({
  postId,
  userId,
  setVisibleComments,
  setComments,
}: {
  postId: string;
  userId: string;
  setVisibleComments: (visible: boolean) => boolean;
  setComments: (comments: (prev: TComment[]) => TComment[]) => void;
}) => {
  const router = useRouter();
  const [newComment, setNewComment] = useState("");
  const handleSubmit = async () => {
    if (newComment.trim()) {
      const commentData: TComment = {
        content: newComment,
        post: postId,
        author: userId,
        createdAt: new Date(),
      };
      setNewComment("");
      startTransition(async () => {
        const res = await handleCommentSubmit(commentData);
        if (res.success) {
          // window.location.reload(); ///finally its working!
          setComments((prev) => [...prev, commentData]); //just Add a new comment to the list
          setVisibleComments(true);
          router.refresh();
        }
        console.log("hmm", res);
      });

      console.log("commentData", commentData);
    }
  };

  return (
    <div>
      <Card className="mx-auto max-w-[1000px] mt-5 mb-5">
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
            onPress={handleSubmit}
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
