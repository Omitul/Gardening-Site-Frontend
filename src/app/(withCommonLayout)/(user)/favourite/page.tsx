import PostCard from "@/components/postCard";
import { getUser } from "@/src/services/authService";
import { Tpost, TUser } from "@/types";
import React from "react";

const FavouritePosts = async () => {
  const User = await getUser();
  let favourites = [];
  if (User) favourites = User.favourites;
  // console.log(favourites);

  console.log("FAVOURITES", favourites);
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
