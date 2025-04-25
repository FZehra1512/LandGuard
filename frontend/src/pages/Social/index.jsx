import PostsGrid from "@/components/SocialModule/PostsGrid";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import image1 from "@/assets/images/contact_page_img.png";
import image2 from "@/assets/images/contact_page_img.png";


const dummyPosts = [
    {
      id: 1,
      title: "Empty Garden Behind House",
      description: "A good-sized garden area that could host 10–15 plants.",
      location: "Karachi, Pakistan",
      image: image1,
    },
    {
      id: 2,
      title: "Vacant Plot Near Gulshan",
      description: "Unused land available for plantation initiatives.",
      location: "Gulshan-e-Iqbal, Karachi",
      image: image2,
    },
  ];

export default function SocialPostsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-6">
        {/* <SearchBar searchQuery={searchQuery} onSearch={onSearch} /> */}
        <PostsGrid posts={dummyPosts} />
      </div>
      <Button variant="primary" className="p-4 rounded-full text-white shadow-lg">
        + Add a Post
      </Button>
    </div>
  );
}
