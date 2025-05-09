// import PostsGrid from "@/components/SocialModule/PostsGrid";
// import { Button } from "@/components/ui/button";
// import Navbar from "@/components/Navbar";
// import image1 from "@/assets/images/contact_page_img.png";
// import image2 from "@/assets/images/contact_page_img.png";

// const dummyPosts = [
//   {
//     id: 1,
//     title: "Empty Garden Behind House",
//     description: "A good-sized garden area that could host 10–15 plants.",
//     location: "Karachi, Pakistan",
//     image: image1,
//   },
//   {
//     id: 2,
//     title: "Vacant Plot Near Gulshan",
//     description: "Unused land available for plantation initiatives.",
//     location: "Gulshan-e-Iqbal, Karachi",
//     image: image2,
//   },
// ];

// export default function SocialPostsPage() {
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />

//       {/* 🌱 Header Section */}
//       <section className="bg-green-50 py-10 px-6 md:px-12 pt-48">
//         <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
//           <div>
//             <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
//               Share Land. Grow Green.
//             </h1>
//             <p className="text-gray-600 max-w-lg">
//               Have an empty space in your neighborhood or backyard? Share it with others to support greenery initiatives and community plantation drives.
//             </p>
//           </div>
//           <Button variant="default" size="lg" className="whitespace-nowrap">
//             + Add an Area
//           </Button>
//         </div>
//       </section>

//       {/* 🌍 Posts Grid */}
//       <section className="container mx-auto px-6 py-10">
//         <PostsGrid posts={dummyPosts} />
//       </section>

//       {/* 📝 Add Post Button (Floating style, optional) */}
//       {/* <div className="fixed bottom-6 right-6">
//         <Button variant="primary" className="p-4 rounded-full text-white shadow-lg">
//           + Add a Post
//         </Button>
//       </div> */}
//     </div>
//   );
// }


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

  useEffect(() => {
    // Fetch posts from the backend when the component mounts
    const getPostsFromBackend = async () => {
      try {
        const { data } = await getPosts();  // Fetch the posts from the API
        setPosts(data);  // Assuming the data is an array of posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    
    getPostsFromBackend();  // Call the function to fetch posts
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
          <PostsGrid posts={dummyPosts} />
        </div>
      </section>

    </div>
  );
}
