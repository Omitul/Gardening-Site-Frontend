"use client";

import React, { useEffect, useState } from "react";
import { Select, SelectItem } from "@nextui-org/react";

import PostCard from "@/components/postCard";
import QuoteDisplay from "@/components/quotesCard";
import { getPosts } from "@/src/services/postService";
import { Tpost } from "@/types";

const Home = () => {
  const [posts, setPosts] = useState<Tpost[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const data = await getPosts();

      setPosts(data?.data || []);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const filteredPosts = posts
    .filter((post: Tpost) => {
      const TitleSearch = post.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      const CategorySearch = post.category
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      const categoryMatch =
        selectedCategory === "All" ||
        post.category?.toLowerCase() === selectedCategory.toLowerCase();

      return (TitleSearch || CategorySearch) && categoryMatch;
    })
    .sort((a, b) => b.votes - a.votes); ///search result or category result upvotes er upor sorted hoye ashbe

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <QuoteDisplay />
      <h4 className="font-semibold font-serif ml-4 mt-4 text-xl">
        Search posts
      </h4>
      <input
        className="mt-5 mb-5 ml-4 p-2 border border-gray-300 rounded"
        placeholder="Search post here..."
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <h4 className="font-semibold font-serif ml-4 mt-4 text-xl">
        Filter by Category
      </h4>
      <Select
        aria-label="Filter posts by category"
        className="mt-2 w-1/6"
        value={selectedCategory}
        onChange={(e) => handleCategoryChange(e.target.value)}
      >
        <SelectItem key="All" value="All">
          All Categories
        </SelectItem>
        <SelectItem key="Vegetables" value="Vegetables">
          Vegetables
        </SelectItem>
        <SelectItem key="Flowers" value="Flowers">
          Flowers
        </SelectItem>
        <SelectItem key="Landscaping" value="Landscaping">
          Landscaping
        </SelectItem>
        <SelectItem key="Fruit Trees" value="Fruit Trees">
          Fruit Trees
        </SelectItem>
        <SelectItem key="Shade Trees" value="Shade Trees">
          Shade Trees
        </SelectItem>
        <SelectItem key="Deciduous Trees" value="Deciduous Trees">
          Deciduous Trees
        </SelectItem>
        <SelectItem key="Medicinal Trees" value="Medicinal Trees">
          Medicinal Trees
        </SelectItem>
      </Select>

      <div className="mt-32 mb-5">
        {filteredPosts.length > 0 ? (
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
