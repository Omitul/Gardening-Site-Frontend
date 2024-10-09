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
import { getAuthor, getUser, updateUser } from "@/src/services/authService";
import { TUser } from "@/types";
import Image from "next/image";
import { toast } from "react-toastify";

interface FollowingModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  Propfollowings: TUser[];
  handleFollowingCount: () => void;
}

const MyFollowings: React.FC<FollowingModalProps> = ({
  isOpen,
  onOpenChange,
  handleFollowingCount,
}) => {
  const [Following, setFollowings] = useState<TUser[]>([]);
  const [unFollowed, setUnfollowed] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchFollowings = async () => {
      try {
        const user = await getUser();
        setFollowings(user?.following);
        setUserId(user?._id);
        console.log("followers of user", user?.followers);

        const Following_him = user?.following;
        console.log("following him", Following_him);
        // setPersonFollowed(Following_him);

        // console.log("Personfollowed", user?.following[0]);
        // const Author = user?.following[0];
        // const PersonFollowed = await getAuthor(Author);
        // console.log("Personfollowed", PersonFollowed);

        console.log("user my following er vitore", user);
      } catch (error) {
        console.error("Error fetching followings:", error);
      }
    };

    if (isOpen) {
      fetchFollowings();
    }
  }, [isOpen]);

  console.log("ISOPEN", isOpen);
  const handleUnfollow = async (followingId: string) => {
    console.log("HELLO", Following);

    const specificPersonFollowed = Following.find(
      (person) => person._id && person._id.toString() === followingId
    );

    console.log(specificPersonFollowed?.following);
    const person = specificPersonFollowed?.following;

    try {
      const updateFollowers =
        person && person.filter((follower) => follower !== userId); /// followed person er followers theke user baad

      const userFollowings = Following.map((following) => following._id!); /// taking array ids

      const updateFollowingFromUser =
        userFollowings &&
        userFollowings.filter((following) => following !== followingId); ///user er following theke person baad

      const updatedUser = await updateUser(userId, {
        following: updateFollowingFromUser,
      });

      await updateUser(followingId, {
        followers: updateFollowers,
      });

      // console.log(updatedPerson);
      // console.log(updatedUser);

      setFollowings((prev) =>
        prev.filter((following) => following._id !== followingId)
      );

      handleFollowingCount(); ///following   count update

      setUnfollowed(!unFollowed);
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Followings</ModalHeader>
              <ModalBody>
                {Following && Following.length > 0 ? (
                  Following.map((following) => (
                    <Card
                      key={following._id}
                      className="mb-2 p-2 flex items-center"
                    >
                      <div className="flex flex-row justify-evenly items-center gap-x-52">
                        <div className="flex flex-row  items-center">
                          <Image
                            src="https://i.postimg.cc/xTzVk2wC/man-face-emotive-icon-smiling-male-character-in-blue-shirt-flat-illustration-isolated-on-white-happy.jpg" // Use the image URL here
                            alt={`${following.username}'s profile picture`}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div className="ml-2">
                            {" "}
                            <p>{following.username}</p>
                          </div>
                        </div>
                        <div>
                          <Button
                            onPress={() =>
                              handleUnfollow(following._id as string)
                            }
                            className={`bg-blue-700 rounded-full text-bold ${
                              unFollowed ? "bg-blue-500" : "bg-gray-500"
                            }`}
                            size="sm"
                          >
                            Unfollow
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <p>You are not following anyone!</p>
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

export default MyFollowings;
