import Navbar from "@/components/Navbar";
import DrivesHero from "@/components/SocialModule/DrivesHero";
import DrivesFilterBar from "@/components/SocialModule/DrivesFilterBar";
import DriveCard from "@/components/SocialModule/DriveCard";

const dummyDrives = [
  {
    id: 1,
    title: "Plantation at City Park",
    location: "Karachi, Pakistan",
    date: "2025-05-10",
    participants: 32,
    capacity: 50,
  },
  {
    id: 2,
    title: "Beach Cleanup & Planting",
    location: "Clifton Beach, Karachi",
    date: "2025-05-15",
    participants: 18,
    capacity: 30,
  },
];

export default function DrivesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* 🌱 Hero */}
      <DrivesHero />

      {/* 🔎 Filter Bar */}
      <div className="container mx-auto -mt-10 px-6 md:px-12">
        <DrivesFilterBar />
      </div>

      {/* 📋 Drives List */}
      <section className="container mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col gap-6">
          {dummyDrives.map((drive) => (
            <DriveCard key={drive.id} drive={drive} />
          ))}
        </div>
      </section>
    </div>
  );
}
