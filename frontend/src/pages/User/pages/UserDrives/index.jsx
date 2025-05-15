"use client";

import { getUserDrives, deleteDrive } from "@/api/SocialDataEndpoints";
import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";
import UserDriveCard from "@/components/SocialModule/UserDriveCard";
import AppLoader from "@/components/ui/app-loader";

const UserDrives = () => {
  const [userDrives, setUserDrives] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDrives();
  }, []);

  const fetchDrives = async () => {
    setLoading(true);
    const res = await getUserDrives();
    setLoading(false);

    if (res.code === 200) {
      setUserDrives(res.data);
    } else {
      toast({ variant: "destructive", title: "Failed to load drives" });
    }
  };

  const handleDelete = async (id) => {
    const res = await deleteDrive(id);
    if (res.code === 200) {
      toast({ title: "Drive deleted successfully" });
      setUserDrives((prevDrives) => prevDrives.filter((d) => d._id !== id));
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
      <h1 className="text-3xl font-bold mb-6">My Plantation Drives</h1>

      {userDrives.length === 0 ? (
        <p className="text-gray-600">You have no drives yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userDrives.map((drive) => (
            <UserDriveCard
              key={drive._id}
              drive={drive}
              onDriveDeleted={() => handleDelete(drive._id)}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default UserDrives;
