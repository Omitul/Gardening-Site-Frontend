"use client";

import PostModal from "@/components/modal_and_post";
import UserProfileCard from "@/components/userProfileCard";
import { Button, useDisclosure } from "@nextui-org/react";

const PostCreation = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="">
        <UserProfileCard />
      </div>

      <div>
        {/* to post */}
        <PostModal isOpen={isOpen} onOpenChange={onOpenChange} />
      </div>
    </div>
  );
};

export default PostCreation;
