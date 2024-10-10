import PostCard from "@/components/postCard";
import { getUser } from "@/src/services/authService";
import { Tpost, TUser } from "@/types";
import React from "react";

const FavouritePosts = async () => {
  const User = await getUser();
  console.log("USER", User);
  if (!User) return <div>No user found</div>;
  const favourites: Tpost[] = User.favourites || [];
  console.log("FAVOURITES", favourites);
  return (
    <div>
      {favourites.map((favourite: Tpost) => (
        <PostCard key={favourite._id} post={favourite} />
      ))}
    </div>
  );
};

export default FavouritePosts;
