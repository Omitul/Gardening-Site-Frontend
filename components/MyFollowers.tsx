"use client";

import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Card,
} from "@nextui-org/react";
import Image from "next/image";

import { getUser } from "@/src/services/authService";
import { TUser } from "@/types";

interface FollowerModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  Propfollowers: TUser[];
}

const MyFollowers: React.FC<FollowerModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const [Followers, setFollowers] = useState<TUser[]>([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const user = await getUser();

        setFollowers(user?.followers);
        // console.log("user my followers er vitore", user);
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };

    if (isOpen) {
      fetchFollowers();
    }
  }, [isOpen]);

  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Followers</ModalHeader>
              <ModalBody>
                {Followers && Followers.length > 0 ? (
                  Followers.map((follower) => (
                    <Card
                      key={follower._id}
                      className="mb-2 p-2 flex items-center"
                    >
                      <div className="flex flex-row justify-evenly items-center gap-x-52">
                        <div className="flex flex-row  items-center">
                          <Image
                            alt={`${follower.username}'s profile picture`}
                            className="rounded-full"
                            height={40}
                            src="https://i.postimg.cc/xTzVk2wC/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy.jpg" // Use the image URL here
                            width={40}
                          />
                          <div className="ml-2">
                            <p>{follower.username}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <p>No followers found.</p>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="faded" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default MyFollowers;
