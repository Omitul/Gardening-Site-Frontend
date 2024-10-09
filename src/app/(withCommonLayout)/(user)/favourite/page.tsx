import PostCard from "@/components/postCard";
import { getUser } from "@/src/services/authService";
import { Tpost, TUser } from "@/types";
import React from "react";

const FavouritePosts = async () => {
  const User = await getUser();
  const { favourites } = User;
  console.log(favourites);
  return (
    <div>
      <div>
        {favourites.map((favourite: Tpost) => (
          <PostCard key={favourite._id} post={favourite} />
        ))}
      </div>
    </div>
  );
};

export default FavouritePosts;
