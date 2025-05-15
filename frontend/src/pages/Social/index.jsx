import { useEffect, useState } from 'react';
import PostsGrid from "@/components/SocialModule/PostsGrid";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import FilterBar from "@/components/SocialModule/FilterBar";
import image1 from "@/assets/images/plant_bg1.png";
import logo from "../../assets/images/Landguard_logo.png";
import { getPosts } from "@/api/SocialDataEndpoints";
import Footer from '@/components/Footer';

export default function SocialPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPostsFromBackend = async () => {
      setLoading(true);
      try {
        const { data } = await getPosts();

        const transformedPosts = data.map(post => {
          const [lat, lng] = post.location.split(',').map(coord => parseFloat(coord.trim()));

          return {
            id: post._id,
            title: post.title,
            description: post.description,
            username: post.username,      
            contact: post.contact,  
            location: {
              name: "Unknown",
              latitude: lat,
              longitude: lng,
            },
            image: post.image_url.startsWith("http")
              ? post.image_url
              : `http://127.0.0.1:8000${post.image_url}`,
          };
        });

        setPosts(transformedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    getPostsFromBackend();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50 w-full py-3 flex items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="w-40 sm:w-44" />
        </Link>
      </nav>

      <section className="relative pt-28 pb-20 px-6 md:px-12 overflow-hidden bg-green-700 text-white">
        <img
          src={image1}
          alt="Header background"
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-10 container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Community Plantation Spots
          </h1>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Explore and share locations that are suitable for tree plantation.
          </p>
          <Link to="/create-post">
            <Button
              variant="default"
              size="lg"
              className="bg-white text-green-700 hover:bg-gray-100 font-semibold"
            >
              + Add a New Spot
            </Button>
          </Link>
        </div>
      </section>

      <FilterBar />

      {/* 🌱 Posts Grid */}
      <section className="bg-amber-50 py-12">
        <div className="container mx-auto px-6">
          {loading ? (
            <div className="text-center py-12 text-gray-600 text-lg">Loading posts...</div>
          ) : posts.length === 0 ? (
            <p className="text-center py-12 text-gray-500">No posts found.</p>
          ) : (
            <PostsGrid posts={posts} />
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
