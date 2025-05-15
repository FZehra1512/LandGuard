import plantationEffort2 from "@/assets/images/CUF_after.png";
import urbanForrest from "@/assets/images/CliftonForrest.png";
import forrest from "@/assets/images/story3.png";

import Footer from "@/components/Footer";

export default function StoryPage() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-[90vh] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${forrest})` }}
      >
        <div className="bg-black/60 p-10 rounded-2xl max-w-3xl text-center shadow-xl">
          <h1 className="text-5xl font-bold mb-4">Reclaiming Karachi’s Barren Lands</h1>
          <p className="text-xl">
            LandGuard isn’t just a platform — it’s a movement. We connect communities, NGOs, and volunteers 
            to transform neglected urban spaces into thriving ecosystems that breathe life into Karachi.
          </p>
        </div>
      </section>

      {/* Clifton Urban Forest Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 h-auto bg-[#f5e8cb] text-black py-20">
        {/* Left - Text Panel */}
        <div className="flex flex-col justify-center px-8 md:px-20">
          <h2 className="text-5xl font-semibold leading-tight mb-6 tracking-wide">
            Clifton Urban Forest
          </h2>
          <p className="text-xl font-normal mb-6 max-w-lg">
            A game-changing green lung in the heart of Karachi. Once a dumping ground, now a thriving urban forest.
          </p>
          <div className="flex items-center gap-2 text-base text-gray-800 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-800" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6c0 4.418 6 10 6 10s6-5.582 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
            Karachi, Pakistan
          </div>
          <div className="flex flex-wrap gap-3 mb-8">
            {["Parks", "City", "Self Sustaining"].map((tag, i) => (
              <span
                key={i}
                className="bg-white text-black rounded-full px-4 py-1.5 text-sm font-medium shadow"
              >
                {tag}
              </span>
            ))}
          </div>
          <a
            href="https://cliftonurbanforest.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-green-900 underline underline-offset-4 hover:text-green-700 transition"
          >
            Visit their site →
          </a>
        </div>

        {/* Right - Image and Stats */}
        <div className="relative overflow-hidden">
          <img
            src={urbanForrest}
            alt="Clifton Urban Forest"
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md shadow-lg rounded-xl px-8 py-4 flex justify-between items-center text-black">
            <div className="text-center">
              <p className="text-2xl font-bold">1,050</p>
              <p className="text-sm text-gray-700">Trees</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">300</p>
              <p className="text-sm text-gray-700">Square Meters</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">32</p>
              <p className="text-sm text-gray-700">Native Species</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benazir Bhutto Shaheed Park Section */}
      <section className="bg-gray-100 px-8 md:px-20 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-4 tracking-wide">Benazir Bhutto Shaheed Park</h2>
            <p className="text-lg text-gray-700 mb-4">
              The Karachi Forestry Department led the revival of this park, turning a
              barren piece of land into a lush, green public space. It now offers not
              just ecological value but also serves as a peaceful retreat for city
              residents.
            </p>
          </div>
          <div>
            <img
              src={plantationEffort2}
              alt="Clifton Forest"
              className="rounded-xl shadow-lg w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Vision Quote Section */}
      <section className="py-20 px-8 bg-green-100 text-center">
        <blockquote className="text-3xl italic text-green-900 max-w-3xl mx-auto">
          “If we transform just 10% of Karachi’s barren spaces, we can change the
          climate of the entire city.”
        </blockquote>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-8 text-center">
        <h2 className="text-4xl font-bold mb-4 tracking-wide">Be Part of the Green Movement</h2>
        <p className="text-lg mb-6 text-gray-700 max-w-2xl mx-auto">
          Whether you're an NGO, a student group, or someone who simply cares — LandGuard
          welcomes your efforts to create a greener Karachi.
        </p>
        <a
          href="/drives"
          className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 text-lg rounded-full shadow-lg"
        >
          Explore Drives
        </a>
      </section>
      <Footer/>
    </div>
  );
}
