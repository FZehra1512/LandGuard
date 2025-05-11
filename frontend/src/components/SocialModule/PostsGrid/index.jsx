import PostCard from "../PostCard";

const PostsGrid = ({ posts }) => {
  return (
    <section className="py-16 px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-800">
          🌿 Available Plantation Spaces
        </h2>
      </div>

      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
};

export default PostsGrid;
