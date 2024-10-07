import { useEffect, useState } from "react";
import { getUser } from "@/src/services/authService";
import { Card, Image } from "@nextui-org/react";
import { Tpost, TUser } from "@/types";
import { getPostById } from "@/src/services/postService";
import PostCard from "./postCard";
import CreatePostSection from "./createPostSection";
import MyFollowers from "./MyFollowers";
import MyFollowings from "./MyFollowings";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

export type FetchedUserData = Pick<
  TUser,
  "username" | "followers" | "verified" | "accountType" | "following" | "_id"
>;

export default function UserProfileCard() {
  const [user, setUser] = useState<FetchedUserData | null>(null);
  const [posts, setPosts] = useState<Tpost[]>([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowings, setShowFollowings] = useState(false);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    const loader = async () => {
      try {
        const fetchedUser: FetchedUserData = await getUser();
        setUser(fetchedUser);
        console.log("Fetched user", fetchedUser);
        const userId = fetchedUser?._id;
        if (userId) {
          const MyPosts = await getPostById(userId);
          // console.log("user", user?._id);
          console.log("MYPOSTSSSSSS", MyPosts);
          setPosts(MyPosts.data);
          setFollowingCount(fetchedUser.following?.length as number);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    loader();
  }, []);

  const handleShowFollowers = () => {
    setShowFollowers(!showFollowers);
  };
  const handleShowFollowings = () => {
    setShowFollowings(!showFollowings);
  };

  const handleFollowingCount = () => {
    setFollowingCount((prev) => prev - 1);
    Swal.fire({
      icon: "success",
      title: "You unfollowed this person!",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  console.log("posts", posts);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      <div>
        <Card className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 mt-10">
          <Image
            alt="Profile background"
            className="object-cover rounded-lg mb-4"
            src="https://nextui.org/images/hero-card-complete.jpeg"
            width={600}
            height={350}
          />
          <h4 className="font-bold text-xl mb-2">{user.username}</h4>{" "}
          <p className="text-white-600 font-bold mt-2 bg-amber-400 p-2 rounded-md">
            Followers: {user.followers?.length || 0}
          </p>
          <p className="text-white-600 font-bold mt-2 bg-amber-400 p-2 rounded-md">
            Following: {followingCount || 0}
          </p>
          <p className="text-white-600 font-bold mt-2 bg-amber-400 p-2 rounded-md">
            Verified: {user.verified ? "Yes" : "No"}
          </p>
          <p className="text-white-600 font-bold mt-2 bg-amber-400 p-2 rounded-md">
            Account Type:{" "}
            <span
              className={
                user.accountType === "basic"
                  ? "text-gray-700"
                  : "text-orange-500"
              }
            >
              {user.accountType}
            </span>
          </p>
          <div className="flex flex-row gap-x-2">
            <span
              className="bg-slate-900 text-white rounded-lg border-dotted w-1/2 text-center mt-2 p-2 cursor-pointer"
              onClick={handleShowFollowers}
            >
              My Followers
            </span>
            <span
              className="bg-slate-900 text-white rounded-lg border-dotted w-1/2 text-center mt-2 p-2 cursor-pointer"
              onClick={handleShowFollowings}
            >
              My Followings
            </span>
          </div>
          {showFollowers && (
            <MyFollowers
              // key={user?.followers[0]}
              isOpen={showFollowers}
              onOpenChange={setShowFollowers}
              Propfollowers={(user.followers as unknown as TUser[]) || []}
            />
          )}
          {showFollowings && (
            <MyFollowings
              // key={}
              isOpen={showFollowings}
              onOpenChange={setShowFollowings}
              Propfollowings={(user.following as unknown as TUser[]) || []}
              handleFollowingCount={handleFollowingCount}
            />
          )}
        </Card>
      </div>
      <div>
        <CreatePostSection />
      </div>
      <div className="mb-5">
        {posts.map((post: any) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
