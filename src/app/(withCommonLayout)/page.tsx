"use client";

import PostCard from "@/components/postCard";
import QuoteDisplay from "@/components/quotesCard";
import { getPosts } from "@/src/services/postService";
import { Tpost } from "@/types";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState<Tpost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true); // Set loading state to true before fetching
      const data = await getPosts();
      setPosts(data?.data || []);
      setLoading(false); // Set loading state to false after fetching
    };
    fetchPosts();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredPosts = posts.filter((post: Tpost) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // .sort((a: Tpost, b: Tpost) => b.upvoted - a.downvoted); // Sort by upvote count

  if (loading) {
    return <p>Loading...</p>; // Display loading state
  }

  return (
    <div>
      <QuoteDisplay />
      <h4 className="font-semibold font-serif ml-4 mt-4 text-xl">
        Search posts
      </h4>
      <input
        type="text"
        placeholder="Search post here..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="mt-5 mb-5 ml-4 p-2 border border-gray-300 rounded"
      />
      <div className="mt-32 mb-5">
        {filteredPosts && filteredPosts.length > 0 ? (
          filteredPosts.map((post: Tpost) => (
            <PostCard key={post._id} post={post} />
          ))
        ) : (
          <p className="text-2xl text-center font-bold font-serif">
            No posts available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
