"use client";

import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import MyFollowings from "./MyFollowings";
import MyFollowers from "./MyFollowers";
import PostCard from "./postCard";

import { Tpost, TUser } from "@/types";
import { getUser } from "@/src/services/authService";
import { getPostById } from "@/src/services/postService";

export type FetchedUserData = Pick<TUser, "followers" | "following" | "_id">;

const UserDashboardCard = () => {
  const [user, setUser] = useState<FetchedUserData | null>(null);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowings, setShowFollowings] = useState(false);
  const [posts, setPosts] = useState<Tpost[]>([]);

  useEffect(() => {
    const loader = async () => {
      try {
        const fetchedUser: FetchedUserData = await getUser();

        // console.log("fetched", fetchedUser);
        setUser(fetchedUser);
        const userId = fetchedUser?._id;

        if (userId) {
          const MyPosts = await getPostById(userId as string);

          setPosts(MyPosts.data);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    loader();
  }, []);

  const handleFollowingCount = () => {
    Swal.fire({
      icon: "success",
      title: "You unfollowed this person!",
      showConfirmButton: false,
      timer: 2000,
    });
  };
  const handleShowFollowers = () => {
    setShowFollowers(!showFollowers);
  };
  const handleShowFollowings = () => {
    setShowFollowings(!showFollowings);
  };

  return (
    <div>
      <h2 className="text-3xl font-serif font-semibold text-center mt-5">
        Dashboard
      </h2>
      <div className="flex flex-col gap-x-2 justify-center items-center mt-5">
        <Button
          className="bg-slate-900 text-white rounded-lg border-dotted w-1/2 text-center mt-2 p-2 cursor-pointer"
          onClick={handleShowFollowers}
        >
          My Followers
        </Button>
        <Button
          className="bg-slate-900 text-white rounded-lg border-dotted w-1/2 text-center mt-2 p-2 cursor-pointer"
          onClick={handleShowFollowings}
        >
          My Followings
        </Button>
      </div>

      {showFollowers && (
        <MyFollowers
          // key={user?.followers[0]}
          Propfollowers={(user?.followers as unknown as TUser[]) || []}
          isOpen={showFollowers}
          onOpenChange={setShowFollowers}
        />
      )}
      {showFollowings && (
        <MyFollowings
          // key={}
          Propfollowings={(user?.following as unknown as TUser[]) || []}
          handleFollowingCount={handleFollowingCount}
          isOpen={showFollowings}
          onOpenChange={setShowFollowings}
        />
      )}

      <h4 className="text-center mt-16 text-3xl font-serif font-semibold">
        My Posts
      </h4>
      <div className="mb-5">
        {posts.map((post: Tpost) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default UserDashboardCard;
