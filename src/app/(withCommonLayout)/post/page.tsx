import PostCard from "@/components/postCard";
import { getPosts } from "@/src/services/postService";
import { Tpost } from "@/types";
import React from "react";

const PostsPage = async () => {
  const data = await getPosts();

  const posts = data?.data;
  console.log("dataaaaaaaaaaaaaaaa", data);

  return (
    <div>
      {posts.map((post: Tpost) => (
        <PostCard key={data._id} post={post} />
      ))}
    </div>
  );
};

export default PostsPage;
