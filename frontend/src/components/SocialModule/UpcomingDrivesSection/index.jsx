// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getDrives } from "@/api/SocialDataEndpoints";

// const dummyDrives = [
//   {
//     id: 1,
//     title: "Plantation at City Park",
//     location: "Karachi, Pakistan",
//     date: "2025-05-10",
//     participants: 40,
//     capacity: 50,
//     status: "active",
//     createdAt: "2025-04-15T10:00:00Z",
//   },
//   {
//     id: 2,
//     title: "Beach Cleanup & Planting",
//     location: "Clifton Beach, Karachi",
//     date: "2025-05-15",
//     participants: 7,
//     capacity: 30,
//     status: "active",
//     createdAt: "2025-04-20T14:30:00Z",
//   },
//   {
//     id: 6,
//     title: "Forest Preservation Campaign",
//     location: "Islamabad, Pakistan",
//     date: "2025-08-10",
//     participants: 50,
//     capacity: 75,
//     status: "active",
//     createdAt: "2025-04-10T09:30:00Z",
//   },
// ];

// // function getProgressColor(percent) {
// //   if (percent < 50) return "bg-rose-300";
// //   if (percent < 75) return "bg-amber-200";
// //   return "bg-emerald-300";
// // }

// // function getProgressColor(percent) {
// //     if (percent < 50) return "bg-emerald-100";
// //     if (percent < 75) return "bg-emerald-300";
// //     return "bg-emerald-500";
// //   }
  
// function getProgressColor(percent) {
//     if (percent < 50) return "bg-muted";        // Yellowish (motivating)
//     if (percent < 75) return "bg-secondary";    // Soft green (good)
//     return "bg-primary";                        // Dark green (very good)
//   }
  

// const UpcomingDrivesSection = () => {
//   const [drives, setDrives] = useState([]);

//   useEffect(() => {
//     const fetchDrives = async () => {
//       const response = await getDrives();
//       if (response.code === 200) {
//         const sortedDrives = [...response.data]
//           .sort((a, b) => new Date(a.date) - new Date(b.date))
//           .slice(0, 3);
//         setDrives(sortedDrives);
//       }
//     };
//     fetchDrives();
//   }, []);

//   return (
//     // <section className="py-12 bg-gray-50">
//      <section className="py-12 bg-background">
//       <div className="container mx-auto px-6 md:px-12">
//         <h2 className="text-3xl font-bold mb-8 text-center">Upcoming Plantation Events</h2>
//         <div className="grid gap-8 md:grid-cols-3">
//           {dummyDrives.map((drive) => {
//             const fillPercent = Math.min(
//               Math.round((drive.participants / drive.capacity) * 100),
//               100
//             );
//             const fillColor = getProgressColor(fillPercent);

//             return (
//               <Link to={"/drives"} key={drive.id}>
//                 <div className="relative overflow-hidden rounded-2xl shadow-lg bg-white">
//                   {/* Background progress */}
//                   <div
//                     className="absolute top-0 left-0 h-full transition-all duration-700 ease-in-out"
//                     style={{
//                       width: `${fillPercent}%`,
//                     }}
//                   >
//                     <div className={`h-full ${fillColor} opacity-60`} />
//                   </div>

//                   {/* Content */}
//                   <div className="relative p-6 flex flex-col gap-4 h-48 justify-center items-center text-center">
//                     <div className="text-5xl font-bold text-gray-800">
//                       {fillPercent}%
//                     </div>
//                     <div className="text-gray-700 font-semibold">
//                       {drive.title}
//                     </div>
//                     <div className="text-gray-500 text-sm">
//                       {drive.location}
//                     </div>
//                     <div className="text-gray-400 text-xs">
//                       Event Date: {new Date(drive.date).toLocaleDateString()}
//                     </div>
//                   </div>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default UpcomingDrivesSection;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDrives } from "@/api/SocialDataEndpoints";
import { Button } from "@/components/ui/button";

const dummyDrives = [
  {
    id: 1,
    title: "Plantation at City Park",
    location: "Karachi, Pakistan",
    date: "2025-05-10",
    participants: 40,
    capacity: 50,
    status: "active",
    createdAt: "2025-04-15T10:00:00Z",
  },
  {
    id: 2,
    title: "Beach Cleanup & Planting",
    location: "Clifton Beach, Karachi",
    date: "2025-05-15",
    participants: 7,
    capacity: 30,
    status: "active",
    createdAt: "2025-04-20T14:30:00Z",
  },
  {
    id: 6,
    title: "Forest Preservation Campaign",
    location: "Islamabad, Pakistan",
    date: "2025-08-10",
    participants: 50,
    capacity: 75,
    status: "active",
    createdAt: "2025-04-10T09:30:00Z",
  },
];

function getProgressColor(percent) {
  if (percent < 50) return "bg-muted";       // Yellowish
  if (percent < 75) return "bg-secondary";   // Soft green
  return "bg-primary";                       // Dark green
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
      }
    };
    fetchDrives();
  }, []);

  return (
    <section className="py-16 px-4 sm:px-8 bg-background">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold mb-2 text-center">Upcoming Plantation Events</h2>
        <p className="text-center text-gray-600 mb-10">
          Join our upcoming plantation drives to contribute to a greener and cleaner environment.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {dummyDrives.map((drive) => {
            const fillPercent = Math.min(
              Math.round((drive.participants / drive.capacity) * 100),
              100
            );
            const fillColor = getProgressColor(fillPercent);

            return (
              <Link to={"/drives"} key={drive.id}>
                <div className="relative overflow-hidden rounded-2xl shadow-md bg-white hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                  {/* Background progress */}
                  <div
                    className="absolute top-0 left-0 h-full transition-all duration-700 ease-in-out"
                    style={{
                      width: `${fillPercent}%`,
                    }}
                  >
                    <div className={`h-full ${fillColor} opacity-20`} />
                  </div>

                  {/* Content */}
                  <div className="relative p-6 flex flex-col gap-4 h-56 justify-center items-center text-center">
                    {/* Icon */}
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                      🌿
                    </div>

                    <div className="text-5xl font-bold text-gray-800">
                      {fillPercent}%
                    </div>
                    <div className="text-gray-800 font-semibold text-lg">
                      {drive.title}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {drive.location}
                    </div>
                    <div className="text-gray-400 text-xs">
                      Event Date: {new Date(drive.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <Link to="/drives">
            <Button variant="secondary" size="lg">View all</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingDrivesSection;
