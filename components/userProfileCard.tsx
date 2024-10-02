import { useEffect, useState } from "react";
import { getUser } from "@/src/services/authService";
import { Card, Image } from "@nextui-org/react";
import { TUser } from "@/types";

export type FetchedUserData = Pick<
  TUser,
  "username" | "followers" | "verified" | "accountType" | "following"
>;

export default function UserProfileCard() {
  const [user, setUser] = useState<FetchedUserData | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const fetchedUser: FetchedUserData = await getUser();
        setUser(fetchedUser);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center">
      <Card className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <Image
          alt="Profile background"
          className="object-cover rounded-lg mb-4"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          width={600}
          height={350}
        />
        <h4 className="font-bold text-xl mb-2">{user.username}</h4>{" "}
        {/* Display username */}
        <p className="text-fuchsia-600 font-bold mt-2">
          Followers: {user.followers?.length || 0}
        </p>
        <p className="text-fuchsia-600 font-bold mt-2">
          Followers: {user.following?.length || 0}
        </p>
        <p className="text-fuchsia-600 font-bold mt-2">
          Verified: {user.verified ? "Yes" : "No"}
        </p>
        <p className="text-fuchsia-600 mt-2 font-bold">
          Account Type:{" "}
          <span
            className={
              user.accountType === "basic" ? "text-gray-700" : "text-orange-500"
            }
          >
            {user.accountType}
          </span>
        </p>
      </Card>
    </div>
  );
}
