"use client";

import UserProfileCard from "@/components/userProfileCard";

const ProfilePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="">
        <UserProfileCard />
      </div>
    </div>
  );
};

export default ProfilePage;
