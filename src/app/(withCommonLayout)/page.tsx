import PostCard from "@/components/postCard";
import QuoteDisplay from "@/components/quotesCard";
import { getPosts } from "@/src/services/postService";
import { Tpost } from "@/types";
import React from "react";

const Home = async () => {
  const data = await getPosts();

  const posts = data?.data;
  console.log("dataaaaaaaaaaaaaaaa", data);

  return (
    <div>
      <QuoteDisplay />
      {/* <h1 className="text-center text-3xl mt-28 font-semi-bold">
        Latest Posts
      </h1> */}
      <div className="mt-32 mb-5">
        {posts.map((post: Tpost) => (
          <PostCard key={data._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
