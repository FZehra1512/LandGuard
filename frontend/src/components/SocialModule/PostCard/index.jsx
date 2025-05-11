import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const PostCard = ({ post }) => {
  const { title, image, description, location, date, organizer } = post;

  const hasCoordinates = location?.latitude && location?.longitude;

  const mapThumbnail = hasCoordinates
    ? `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=15&size=400x200&maptype=roadmap&markers=color:green%7C${location.latitude},${location.longitude}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
    : null;

  const googleMapsLink = hasCoordinates
    ? `https://www.google.com/maps?q=${location.latitude},${location.longitude}`
    : null;

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card className="group transition duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 border-none rounded-3xl overflow-hidden bg-white">
      <div className="relative">
        <img
          src={image || "https://via.placeholder.com/400x200?text=No+Image"}
          alt={title}
          className="w-full h-48 object-cover"
        />

        {/* Location Tag */}
        <div className="absolute top-3 left-3 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-green-800 font-medium px-3 py-1 text-xs rounded-full shadow">
          <MapPin className="w-4 h-4" />
          <span>{location?.name || "Unknown Location"}</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition line-clamp-1">
          {title || "Untitled Post"}
        </h3>

        {description && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-3">
            {description}
          </p>
        )}

        <div className="mt-3 text-xs text-gray-500 space-y-1">
          {date && <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>}
          {organizer && <p><strong>Organizer:</strong> {organizer}</p>}
        </div>

        <Button
          variant="ghost"
          className="mt-5 w-full flex items-center justify-center gap-2 border border-green-600 text-green-700 hover:bg-green-50 hover:text-green-900 rounded-xl transition"
          onClick={() => setIsModalOpen(true)} // Open modal on button click
        >
          <Info className="w-4 h-4" />
          View Details
        </Button>
      </div>

      {/* Modal for Map */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Location on Map</DialogTitle>
          </DialogHeader>
          {mapThumbnail && (
            <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
              <img
                src={mapThumbnail}
                alt="Map location"
                className="w-full h-60 object-cover rounded-lg border"
              />
            </a>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PostCard;


// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { MapPin, Info } from "lucide-react";

// const PostCard = ({ post }) => {
//   const { title, image, description, location, date, organizer } = post;

//   const hasCoordinates = location?.latitude && location?.longitude;

//   const mapThumbnail = hasCoordinates
//     ? `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=15&size=400x200&maptype=roadmap&markers=color:green%7C${location.latitude},${location.longitude}&key=`
//     : null;

//   const googleMapsLink = hasCoordinates
//     ? `https://www.google.com/maps?q=${location.latitude},${location.longitude}`
//     : null;

//   return (
//     <Card className="group transition duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 border-none rounded-3xl overflow-hidden bg-white relative">
//       <div className="relative">
//         <img
//           src={image || "https://via.placeholder.com/400x200?text=No+Image"}
//           alt={title}
//           className="w-full h-48 object-cover"
//         />

//         {/* Location Tag */}
//         <div className="absolute top-3 left-3 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-green-800 font-medium px-3 py-1 text-xs rounded-full shadow">
//           <MapPin className="w-4 h-4" />
//           <span>{location?.name || "Unknown Location"}</span>
//         </div>
//       </div>

//       <div className="p-5">
//         <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition line-clamp-1">
//           {title || "Untitled Post"}
//         </h3>

//         {description && (
//           <p className="text-sm text-gray-600 mt-2 line-clamp-3">
//             {description}
//           </p>
//         )}

//         <div className="mt-3 text-xs text-gray-500 space-y-1">
//           {date && <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>}
//           {organizer && <p><strong>Organizer:</strong> {organizer}</p>}
//         </div>

//         <Button
//           variant="ghost"
//           className="mt-5 w-full flex items-center justify-center gap-2 border border-green-600 text-green-700 hover:bg-green-50 hover:text-green-900 rounded-xl transition"
//         >
//           <Info className="w-4 h-4" />
//           View Details
//         </Button>
        
//         {/* Map thumbnail on hover */}
//         {mapThumbnail && (
//           <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-4 w-80 h-48 opacity-0 group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300 ease-in-out shadow-lg rounded-lg overflow-hidden bg-white">
//             <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
//               <img
//                 src={mapThumbnail}
//                 alt="Map location"
//                 className="w-full h-full object-cover"
//               />
//             </a>
//           </div>
//         )}
//       </div>
//     </Card>
//   );
// };

// export default PostCard;
