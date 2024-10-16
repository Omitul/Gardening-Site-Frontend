import { useEffect, useRef, useState } from "react";
import { Button, Card, Image } from "@nextui-org/react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { TiStarFullOutline } from "react-icons/ti";
import Link from "next/link";
import { useRouter } from "next/navigation";

import PostCard from "./postCard";
import CreatePostSection from "./createPostSection";
import MyFollowers from "./MyFollowers";
import MyFollowings from "./MyFollowings";

import uploadImage from "@/src/lib/imageUpload";
import { getPostById } from "@/src/services/postService";
import { Tpost, TUser } from "@/types";
import { getUser, updateUser } from "@/src/services/authService";

export type FetchedUserData = Pick<
  TUser,
  | "username"
  | "followers"
  | "verified"
  | "accountType"
  | "following"
  | "_id"
  | "profilePicture"
  | "email"
>;

export default function UserProfileCard() {
  const [user, setUser] = useState<FetchedUserData | null>(null);
  const [posts, setPosts] = useState<Tpost[]>([]);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowings, setShowFollowings] = useState(false);
  const [followingCount, setFollowingCount] = useState(0);
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  useEffect(() => {
    const loader = async () => {
      try {
        const fetchedUser: FetchedUserData = await getUser();

        // console.log("fetched", fetchedUser);
        setUser(fetchedUser);
        // console.log("Fetched user", fetchedUser);
        const userId = fetchedUser?._id;

        // console.log("user", userId);
        if (userId) {
          const MyPosts = await getPostById(userId as string);

          // console.log("user", user?._id);
          // console.log("MYPOSTSSSSSS", MyPosts);
          setPosts(MyPosts.data);
          setFollowingCount(fetchedUser.following?.length as number);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    loader();
  }, []);

  const handleUpdateName = async () => {
    if (user && newName.trim()) {
      try {
        await updateUser(user._id as string, { username: newName });
        setUser((prev) => (prev ? { ...prev, username: newName } : null));
        setIsNameModalOpen(false);
        Swal.fire({
          icon: "success",
          title: "Name updated successfully!",
          showConfirmButton: false,
          timer: 2000,
        });
      } catch (error) {
        console.error("Error updating name:", error);
      }
    }
  };

  // const handleUpdateEmail = async () => {
  //   if (user && newEmail.trim()) {
  //     try {
  //       await updateUser(user._id as string, { email: newEmail });
  //       setUser((prev) => (prev ? { ...prev, email: newEmail } : null));
  //       setIsEmailModalOpen(false);
  //       Swal.fire({
  //         icon: "success",
  //         title: "Email updated successfully!",
  //         showConfirmButton: false,
  //         timer: 2000,
  //       });
  //     } catch (error) {
  //       console.error("Error updating email:", error);
  //     }
  //   }
  // };

  const handleGetVerified = () => {
    //check if atleast one upvote is their in his posts

    const isThereOneVote = posts.some((post: Tpost) => post.votes > 0);

    // console.log("usThereoneVote", isThereOneVote);
    if (!isThereOneVote) {
      Swal.fire({
        icon: "error",
        text: "You need at least one upvote in your posts to get verified!",
        timer: 2000,
      });

      return;
    } else {
      router.push("/checkout");
    }
  };

  const uploadProfilePic = async () => {
    if (profilePic && user) {
      const uploadedUrl = await uploadImage(profilePic);

      if (uploadedUrl) {
        try {
          await updateUser(user._id as string, {
            profilePicture: uploadedUrl,
          });
          setUser((prev) =>
            prev ? { ...prev, profilePicture: uploadedUrl } : null
          );
          Swal.fire({
            icon: "success",
            title: "Profile picture uploaded!",
            showConfirmButton: false,
            timer: 2000,
          });
          setProfilePic(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        } catch (error) {
          console.error("Failed to upload profile picture:", error);
        }
      } else {
        toast.error("Failed to upload image.");
      }
    } else {
      toast.error("No profile picture selected.");
    }
  };

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

  // console.log("posts", posts);

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
            height={350}
            src={user.profilePicture}
            width={600}
          />
          <input
            ref={fileInputRef}
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setProfilePic(e.target.files[0]);
              }
            }}
          />
          <Button
            className="mt-2 bg-blue-500 text-white p-2 rounded-md"
            onClick={uploadProfilePic}
          >
            Upload Profile Picture
          </Button>
          <h4 className="font-bold text-xl mb-2">
            {user?.username}
            <Button
              className="ml-10 text-sm w-13 h-7 bg-black text-white mt-5"
              onClick={() => setIsNameModalOpen(true)}
            >
              Change Name
            </Button>
          </h4>
          <h4 className="font-bold text-xl mb-2">
            {user?.email}
            {/* <Button
              onClick={() => setIsEmailModalOpen(true)}
              className="ml-10 text-sm w-13 h-7 bg-black text-white"
            >
              Change Email
            </Button> */}
          </h4>
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
                  : "text-orange-700"
              }
            >
              {user.accountType}
            </span>
          </p>
          <div className="flex flex-row gap-x-2">
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
              Propfollowers={(user.followers as unknown as TUser[]) || []}
              isOpen={showFollowers}
              onOpenChange={setShowFollowers}
            />
          )}
          {showFollowings && (
            <MyFollowings
              // key={}
              Propfollowings={(user.following as unknown as TUser[]) || []}
              handleFollowingCount={handleFollowingCount}
              isOpen={showFollowings}
              onOpenChange={setShowFollowings}
            />
          )}

          <div className="flex flex-col">
            <div>
              <Link href="/change-password">
                <Button
                  className="w-1/4 px-20 mt-2 bg-gray-900 text-white rounded-md"
                  variant="solid"
                >
                  Change Password
                </Button>
              </Link>
            </div>
            <div>
              <Button
                className="w-1/4 px-20 mt-2 bg-orange-500 text-white rounded-md font-semibold"
                variant="solid"
                onClick={() => handleGetVerified()}
              >
                Get Verified
              </Button>
            </div>
          </div>

          <Link
            passHref
            className="flex flex-row  items-center mt-5 gap-x-1"
            href="/favourite"
          >
            <p className="text-yellow-500 font-bold">
              <TiStarFullOutline />
            </p>
            <p className="text-xl font-serif font-semibold text-blue-500">
              Favourites
            </p>
          </Link>
        </Card>
      </div>
      <div>
        <CreatePostSection />
      </div>

      {/*posts"*/}
      <div className="mb-5">
        {posts.map((post: Tpost) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      {/*adding modals, name and email change er jnno*/}
      <div>
        {isNameModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-30">
            <div className="bg-white p-6 rounded-lg">
              <h4 className="font-bold text-xl mb-4">Change Name</h4>
              <input
                className="border p-2 rounded mb-4 w-full"
                placeholder="Enter new name"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
              <Button
                className="mr-2"
                onClick={() => setIsNameModalOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleUpdateName}>Confirm</Button>
            </div>
          </div>
        )}

        {isEmailModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-30">
            <div className="bg-white p-6 rounded-lg">
              {/* <h4 className="font-bold text-xl mb-4">Change Email</h4>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="border p-2 rounded mb-4 w-full"
                placeholder="Enter new email"
              /> */}
              {/* <Button
                onClick={() => setIsEmailModalOpen(false)}
                className="mr-2"
              > */}
              Cancel
              {/* </Button>
              <Button onClick={handleUpdateEmail}>Confirm</Button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
