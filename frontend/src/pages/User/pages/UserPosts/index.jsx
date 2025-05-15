"use client";

import { useEffect, useState } from "react";
import { getUserPosts, deleteUserPost } from "@/api/SocialDataEndpoints";
import { toast } from "@/hooks/use-toast";
import AppLoader from "@/components/ui/app-loader";
import UserPostCard from "@/components/SocialModule/UserPostCard.jsx";

const UserPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const res = await getUserPosts();
    setLoading(false);

    if (res.code === 200) {
      setUserPosts(res.data);
    } else {
      toast({ variant: "destructive", title: "Failed to load posts" });
    }
  };

  const handleDelete = async (id) => {
    const res = await deleteUserPost(id);
    if (res.code === 200) {
      toast({ title: "Post deleted successfully" });
      setUserPosts((prevPosts) => prevPosts.filter((p) => p._id !== id));
    } else {
      toast({
        variant: "destructive",
        title: "Delete failed",
        description: res.data,
      });
    }
  };

  if (loading) return <AppLoader />;

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">My Plantation Site Posts</h1>

      {userPosts.length === 0 ? (
        <p className="text-gray-600">
          You have not posted any plantation sites yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userPosts.map((post) => (
            <UserPostCard key={post._id} post={post} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </main>
  );
};

export default UserPosts;
