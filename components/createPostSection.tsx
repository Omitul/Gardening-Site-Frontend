import { Button } from "@nextui-org/button";
import { useDisclosure } from "@nextui-org/react";
import React from "react";

import PostModal from "./modal_and_post";

const CreatePostSection = () => {
  const { onOpen, isOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <div className="bg-gray-600 rounded-lg shadow-lg p-6 px-64 w-full max-w-md flex justify-center mb-24">
        <Button
          className="mt-4 w-full px-20 bg-gray-800 text-white font-semibold"
          style={{ width: "100%" }}
          variant="bordered"
          onPress={onOpen}
        >
          Create Post
        </Button>
        <PostModal isOpen={isOpen} onOpenChange={onOpenChange} />
      </div>
    </div>
  );
};

export default CreatePostSection;
