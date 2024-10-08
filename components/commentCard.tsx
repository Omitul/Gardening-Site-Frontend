"use client";
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
} from "@nextui-org/react";
import { TComment } from "@/types";
import { useState } from "react";

interface CommentCardProps {
  comment: TComment;
  visibleComments: boolean;
  onEdit: (newContent: string, id: string) => void;
  onDelete: (id: string) => void;
}

export const CommentCard = ({
  comment,
  visibleComments,
  onEdit,
  onDelete,
}: CommentCardProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [newContent, setNewContent] = useState(comment.content);

  const handleEdit = (id: string) => {
    /////calling  postcard edit function
    if (newContent.trim()) {
      onEdit(newContent, id);
    }
    onOpenChange();
  };

  const handleDelete = (id: string) => {
    /////calling in postcard delete function
    onDelete(id);
  };

  return (
    <>
      {visibleComments && comment.content ? (
        <Card className="mx-auto max-w-[1000px] mt-5">
          <CardBody onClick={onOpen} className="cursor-pointer">
            <div className="border-b py-2">
              <p>{comment.content}</p>
            </div>
          </CardBody>

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
        </Card>
      ) : null}
    </>
  );
};
