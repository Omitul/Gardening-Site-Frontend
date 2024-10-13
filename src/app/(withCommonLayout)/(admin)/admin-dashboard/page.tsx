"use client";

import { useEffect, useState } from "react";

import AdminDashboardCard from "@/components/adminDashboardCard";
import PostCard from "@/components/postCard";
import { getPosts } from "@/src/services/postService";
import { Tpost } from "@/types";

const AdminDashboard = () => {
  const [posts, setPosts] = useState<Tpost[]>([]);

  useEffect(() => {
    const loader = async () => {
      try {
        const res = await getPosts();

        // console.log("res", res);
        setPosts(res?.data);
      } catch (error) {
        // console.error("Failed to fetch user:", error);
      }
    };

    loader();
  }, []);

  return (
    <div>
      <h4 className="mt-5 mb-8 text-center font-semibold font-serif text-3xl">
        Admin Dashboard
      </h4>
      <AdminDashboardCard />

      <h4 className="mt-40 mb-8 text-center font-semibold font-serif text-3xl">
        Manage Timeline Posts
      </h4>

      <div className="mb-5">
        {posts.map((post: Tpost) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
