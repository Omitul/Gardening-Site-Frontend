import PostCard from "@/components/postCard";
import { getUser } from "@/src/services/authService";
import { Tpost, TUser } from "@/types";
import React from "react";

const FavouritePosts = async () => {
  const User = await getUser();
  console.log("USER", User);
  if (!User)
    return (
      <div className="text-2xl text-center font-semibold">No user found!</div>
    );

  <h4 className="text-center text-2xl font-semibold mt-5">Favourite Posts</h4>;
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
