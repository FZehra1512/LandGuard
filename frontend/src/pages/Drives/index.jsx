import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import DriveCreationForm from "@/components/SocialModule/DriveCreationForm";
import Navbar from "@/components/Navbar";
import DrivesHero from "@/components/SocialModule/DrivesHero";
import DrivesFilterBar from "@/components/SocialModule/DrivesFilterBar";
import DriveCard from "@/components/SocialModule/DriveCard";
import { getDrives } from "@/api/SocialDataEndpoints"; 


const dummyDrives = [
  {
    id: 1,
    title: "Plantation at City Park",
    location: "Karachi, Pakistan",
    date: "2025-05-10",
    participants: 50,
    capacity: 50,
    status: "active",
    createdAt: "2025-04-15T10:00:00Z", 
  },
  {
    id: 2,
    title: "Beach Cleanup & Planting",
    location: "Clifton Beach, Karachi",
    date: "2025-05-15",
    participants: 18,
    capacity: 30,
    status: "active", 
    createdAt: "2025-04-20T14:30:00Z",
  },
 
  {
    id: 6,
    title: "Forest Preservation Campaign",
    location: "Islamabad, Pakistan",
    date: "2025-08-10",
    participants: 40,
    capacity: 75,
    status: "active",
    createdAt: "2025-04-10T09:30:00Z",
  },
  {
    id: 7,
    title: "Tree Planting in Rural Areas",
    location: "Lahore, Pakistan",
    date: "2025-06-30",
    participants: 100,
    capacity: 150,
    status: "active",
    createdAt: "2025-04-27T07:45:00Z",
  },
];



export default function DrivesPage() {
  const [isCreatingDrive, setIsCreatingDrive] = useState(false);
  const [drives, setDrives] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchDrives = async () => {
      setLoading(true);
      const response = await getDrives();
      if (response.code === 200) {
        setDrives(response.data); 
      } else {
        console.error("Failed to fetch drives:", response.data);
      }
      setLoading(false);
    };

    fetchDrives();
  }, []); 
  return (
    <div className="bg-slate-100 min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <DrivesHero onCreateClick={() => setIsCreatingDrive(true)} />

      {/* Filter Bar */}
      <div className="container mx-auto -mt-10 px-6 md:px-12">
        <DrivesFilterBar />
      </div>

      {/* Animate Presence for smooth animation */}
      <AnimatePresence>
        {isCreatingDrive && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="container mx-auto mt-8 px-6 md:px-12"
          >
            <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-10 relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setIsCreatingDrive(false)}
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Form */}
              <p className="text-gray-500 mb-8 text-center">
                Fill in the details below to organize your drive and invite people to join!
              </p>
              <DriveCreationForm />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drives List */}
      <section className="container mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col gap-6">
          {loading ? (
            <p>Loading drives...</p>
          ) : (
            dummyDrives.map((drive) => (
              <DriveCard key={drive.id} drive={drive} />
            ))
          )}
        </div>
      </section>
    </div>
  );
}
