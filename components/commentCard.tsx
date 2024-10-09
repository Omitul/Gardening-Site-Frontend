import {
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  useDisclosure,
  Avatar,
} from "@nextui-org/react";
import { TComment } from "@/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getAuthor, getUser } from "@/src/services/authService";

interface CommentCardProps {
  comment: TComment;
  userId: string;
  visibleComments: boolean;
  onEdit: (newContent: string, id: string) => void;
  onDelete: (id: string) => void;
}

export const CommentCard = ({
  comment,
  visibleComments,
  onEdit,
  onDelete,
  userId,
}: CommentCardProps) => {
  // console.log("username", username);
  const author: any = comment?.author;
  // console.log("commentauthor", comment.author);

  const isAuthor = userId === author._id;

  const { profilePicture, username } = author;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newContent, setNewContent] = useState(comment.content);
  const [profilePic, setProfilePic] = useState(profilePicture);
  const [usernameAuthor, setUsernameAuthor] = useState(username);
  // const [userId, setUserId] = useState("");

  const handleEdit = (id: string) => {
    /////calling  postcard edit function
    if (newContent.trim()) {
      onEdit(newContent, id);
    }
    onOpenChange();
  };

  useEffect(() => {
    const fetch = async () => {
      let commentAuthor;
      //the thing is that: sometimes its not populating and sometimes not!!
      if (typeof comment.author === "object") {
        commentAuthor = comment.author;
      } else {
        try {
          commentAuthor = await getAuthor(comment.author);
        } catch (error) {
          console.error("Failed to fetch author:", error);
          return;
        }
      }
      setUsernameAuthor(commentAuthor?.username);
      setProfilePic(commentAuthor?.profilePicture);
    };
    fetch();
  }, [comment]);

  const handleDelete = (id: string) => {
    /////calling in postcard delete function
    onDelete(id);
  };

  return (
    <>
      {visibleComments && comment.content ? (
        <Card className="mx-auto max-w-[1000px] mt-5">
          <CardBody onClick={onOpen} className="cursor-pointer">
            <div>
              <div className="flex flex-row gap-x-3 items-center mb-2">
                <Avatar isBordered radius="full" size="md" src={profilePic} />
                <div>{usernameAuthor}</div>
              </div>
            </div>
            <div className="border-b py-2">
              <p>{comment.content}</p>
            </div>
          </CardBody>

          {isAuthor && (
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
              <ModalContent>
                {() => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Edit Comment
                    </ModalHeader>
                    <ModalBody>
                      <Input
                        label="Comment"
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button
                        color="danger"
                        variant="light"
                        onPress={() => onOpenChange()}
                      >
                        Close
                      </Button>
                      <Button
                        color="primary"
                        onPress={() => handleEdit(comment._id as string)}
                      >
                        Save
                      </Button>
                      <Button
                        color="warning"
                        variant="light"
                        onPress={() => handleDelete(comment._id as string)}
                      >
                        Delete
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          )}
        </Card>
      ) : null}
    </>
  );
};
