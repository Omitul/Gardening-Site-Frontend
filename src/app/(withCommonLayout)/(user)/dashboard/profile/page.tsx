"use client";

import PostModal from "@/components/modal";
import UserProfileCard from "@/components/userProfileCard";
import { Button, useDisclosure } from "@nextui-org/react";

const PostCreation = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div>
        <UserProfileCard />
      </div>

      <div>
        <div className="bg-gray-600 rounded-lg shadow-lg p-6 px-64 w-full max-w-md flex justify-center mb-24">
          <Button
            className="mt-4 w-full px-20 bg-gray-800 text-white font-semibold"
            variant="bordered"
            onPress={onOpen}
            style={{ width: "100%" }}
          >
            Create Post
          </Button>
        </div>

        {/* to post */}
        <PostModal isOpen={isOpen} onOpenChange={onOpenChange} />
      </div>
    </div>
  );
};

export default PostCreation;
