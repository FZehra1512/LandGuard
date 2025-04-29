import PostCard from "../PostCard";

const PostsGrid = ({ posts }) => {
  return (
    <main className="py-8 px-6">
      <div className="text-3xl font-semibold mb-4">Available Plantation Spaces</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
};

export default PostsGrid;
