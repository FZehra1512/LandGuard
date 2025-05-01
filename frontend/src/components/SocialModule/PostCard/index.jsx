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
