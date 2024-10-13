import React from "react";

import PostCard from "@/components/postCard";
import { getUser } from "@/src/services/authService";
import { Tpost } from "@/types";

const FavouritePosts = async () => {
  const User = await getUser();

  console.log("USER", User);
  if (!User)
    return (
      <div className="text-2xl text-center font-semibold">No user found!</div>
    );

  const favourites: Tpost[] = User.favourites || [];

  console.log("FAVOURITES", favourites);

  return (
    <div>
      <h4 className="text-center text-2xl font-semibold mt-10">
        Favourite Posts
      </h4>
      ;
      {favourites.map((favourite: Tpost) => (
        <PostCard key={favourite._id} post={favourite} />
      ))}
    </div>
  );
};

export default FavouritePosts;
