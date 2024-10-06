import { useEffect, useState } from "react";
import { getUser } from "@/src/services/authService";
import { Card, Image } from "@nextui-org/react";
import { Tpost, TUser } from "@/types";
import { getPostById } from "@/src/services/postService";
import PostCard from "./postCard";
import CreatePostSection from "./createPostSection";

export type FetchedUserData = Pick<
  TUser,
  "username" | "followers" | "verified" | "accountType" | "following" | "_id"
>;

export default function UserProfileCard() {
  const [user, setUser] = useState<FetchedUserData | null>(null);
  const [posts, setPosts] = useState<Tpost[]>([]);

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
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    loader();
  }, []);

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
          {/* Display username */}
          <p className="text-white-600 font-bold mt-2 bg-amber-400 p-2 rounded-md">
            Followers: {user.followers?.length || 0}
          </p>
          <p className="text-white-600 font-bold mt-2 bg-amber-400 p-2 rounded-md">
            Following: {user.following?.length || 0}
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
