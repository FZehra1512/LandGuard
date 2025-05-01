import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PostCard = ({ post }) => {
  return (
    <Card className="transition-transform duration-200 hover:scale-[1.02] hover:shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
      <div className="relative">
        <img
          src={post.image || "https://via.placeholder.com/400x200?text=No+Image"}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2 bg-white/90 text-xs font-medium px-2 py-1 rounded-md shadow text-gray-600">
          {post.location}
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {post.title}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-3">
          {post.description}
        </p>

        <div className="mt-4">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PostCard;



// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { MapPin, Info } from "lucide-react";

// const PostCard = ({ post }) => {
//   return (
//     <Card className="group transition duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 border-none rounded-3xl overflow-hidden bg-white">
//       <div className="relative">
//         <img
//           src={post.image || "https://via.placeholder.com/400x200?text=No+Image"}
//           alt={post.title}
//           className="w-full h-48 object-cover"
//         />

//         {/* Location tag */}
//         <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm text-xs text-green-700 font-semibold px-3 py-1 rounded-full shadow-sm">
//           <MapPin className="w-3 h-3" />
//           {post.location}
//         </div>
//       </div>

//       <div className="p-5">
//         <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition line-clamp-1">
//           {post.title}
//         </h3>

//         <p className="text-sm text-gray-600 mt-1 line-clamp-3">
//           {post.description}
//         </p>

//         <div className="mt-4">
//           <Button
//             variant="ghost"
//             className="w-full flex items-center justify-center gap-2 border border-green-600 text-green-700 hover:bg-green-50 hover:text-green-900 rounded-xl transition"
//           >
//             <Info className="w-4 h-4" />
//             View Details
//           </Button>
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default PostCard;
