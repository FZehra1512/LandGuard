import { useEffect, useState } from 'react';
import PostsGrid from "@/components/SocialModule/PostsGrid";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import FilterBar from "@/components/SocialModule/FilterBar";
import image1 from "@/assets/images/plant_bg1.png";
import image2 from "@/assets/images/contact_page_img.png";
import logo from "../../assets/images/Landguard_logo.png";
import { getPosts } from "@/api/SocialDataEndpoints";


const dummyPosts = [
  {
    id: 1,
    title: "Empty Garden Behind House",
    description: "A good-sized garden area that could host 10–15 plants.",
    location: {
      name: "Karachi, Pakistan",
      latitude: 24.8607,
      longitude: 67.0011,
    },
    image: image1,
  },
  {
    id: 2,
    title: "Vacant Plot Near Gulshan",
    description: "Unused land available for plantation initiatives.",
    location: {
      name: "Gulshan-e-Iqbal, Karachi",
      latitude: 24.9263,
      longitude: 67.1124,
    },
    image: image2,
  },
];


export default function SocialPostsPage() {

  const [posts, setPosts] = useState([]); //use this instead of dummyposts afterwards

  // useEffect(() => {
  //   // Fetch posts from the backend when the component mounts
  //   const getPostsFromBackend = async () => {
  //     try {
  //       const { data } = await getPosts();  // Fetch the posts from the API
  //       setPosts(data);  // Assuming the data is an array of posts
  //     } catch (error) {
  //       console.error("Error fetching posts:", error);
  //     }
  //   };
    
  //   getPostsFromBackend();  // Call the function to fetch posts
  // }, []);

  useEffect(() => {
  const getPostsFromBackend = async () => {
    try {
      const { data } = await getPosts();

      // Transform API response to match PostsGrid structure
      const transformedPosts = data.map(post => {
        const [lat, lng] = post.location.split(',').map(coord => parseFloat(coord.trim()));

        return {
          id: post._id,
          title: post.title,
          description: post.description,
          location: {
            name: "Unknown", // or get it from reverse geocoding later
            latitude: lat,
            longitude: lng,
          },
          image: post.image_url.startsWith("http")
            ? post.image_url
            : `http://127.0.0.1:8000${post.image_url}`,  // full image path
        };
      });

      setPosts(transformedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
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
        <div className="absolute inset-0 bg-green-900 opacity-50"></div>

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

      {/* 🪴 Posts Grid */}
      <section className="bg-amber-50">
        <div className="container mx-auto px-6">
          <PostsGrid posts={posts} />
        </div>
      </section>

    </div>
  );
}
