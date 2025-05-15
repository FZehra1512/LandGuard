import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDrives } from "@/api/SocialDataEndpoints";
import { Button } from "@/components/ui/button";

function getProgressColor(percent) {
  if (percent < 50) return "bg-muted";       // Yellowish
  if (percent < 75) return "bg-secondary";   // Soft green
  return "bg-primary";                        // Dark green
}

const UpcomingDrivesSection = () => {
  const [drives, setDrives] = useState([]);

  useEffect(() => {
    const fetchDrives = async () => {
      const response = await getDrives();
      if (response.code === 200) {
        const sortedDrives = [...response.data]
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 3);
        setDrives(sortedDrives);
      } else {
        setDrives([]);
        console.error("Failed to fetch drives:", response.data);
      }
    };
    fetchDrives();
  }, []);

  return (
    <section className="py-16 px-4 sm:px-8 bg-background">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold mb-2 text-center">
          Upcoming Plantation Events
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Join our upcoming plantation drives to contribute to a greener and
          cleaner environment.
        </p>

        {drives.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No upcoming events yet. Stay tuned!
          </p>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {drives.map((drive) => {
              const fillPercent = Math.min(
                Math.round((drive.participants.length / drive.capacity) * 100),
                100
              );
              const fillColor = getProgressColor(fillPercent);

              return (
                <Link to="/drives" key={drive._id || drive.id}>
                  <div className="relative overflow-hidden rounded-2xl shadow-md bg-white hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                    {/* Background progress */}
                    <div
                      className="absolute top-0 left-0 h-full transition-all duration-700 ease-in-out"
                      style={{ width: `${fillPercent}%` }}
                    >
                      <div className={`${fillColor} opacity-20 h-full`} />
                    </div>

                    {/* Content */}
                    <div className="relative p-6 flex flex-col gap-4 h-56 justify-center items-center text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                        🌿
                      </div>

                      <div className="text-5xl font-bold text-gray-800">
                        {fillPercent}%
                      </div>
                      <div className="text-gray-800 font-semibold text-lg">
                        {drive.title}
                      </div>
                      <div className="text-gray-500 text-sm">{drive.location}</div>
                      <div className="text-gray-400 text-xs">
                        Event Date: {new Date(drive.dateTime).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Call to action */}
        <div className="text-center mt-12">
          <Link to="/drives">
            <Button variant="secondary" size="lg">
              View all
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingDrivesSection;
