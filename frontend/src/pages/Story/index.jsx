// import { Button } from "@/components/ui/button";

// // Images
// import heroImage from "@/assets/images/contact_page_img.png";
// import barren1 from "@/assets/images/CUF_Before.png";
// import barren2 from "@/assets/images/CUF_Before.png";
// import emptyPlot from "@/assets/images/CUF_Before.png";
// import plantationEffort1 from "@/assets/images/CUF_after.png";
// import plantationEffort2 from "@/assets/images/CUF_after.png";
// import futureGreen from "@/assets/images/CUF_after.png";

// export default function StoryPage() {
//   return (
//     <div className="bg-[#FAF9F5] flex flex-col items-center">

//       {/* Hero Section */}
//       <section className="relative w-full h-[75vh] flex items-center justify-center bg-green-800 text-white">
//         <img src={heroImage} alt="LandGuard Hero" className="absolute inset-0 w-full h-full object-cover opacity-70" />
//         <div className="relative text-center px-6">
//           <h1 className="text-4xl md:text-6xl font-bold">Reviving Karachi's Lost Green Spaces</h1>
//           <p className="text-lg md:text-2xl mt-4">LandGuard: Mapping the path back to nature</p>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section className="text-center max-w-3xl px-6 py-16 space-y-4">
//         <div className="flex justify-center gap-8 text-green-800 font-bold text-xl md:text-2xl">
//           <div>60% Green Cover Lost</div>
//           <div>1200+ Public Grounds Surveyed</div>
//           <div>300+ Volunteer Drives</div>
//         </div>
//         <p className="text-gray-700 mt-6 text-lg leading-relaxed">
//           Karachi’s ecosystem has faced severe depletion due to rapid urban growth. With the help of volunteers, NGOs, and concerned citizens, 
//           LandGuard maps spaces that are ready for transformation — bringing hope back into the city's heart.
//         </p>
//       </section>

//       {/* Quote Section */}
//       <section className="max-w-2xl text-center px-6 py-12">
//         <blockquote className="text-green-700 text-2xl italic font-semibold">
//           "The true measure of a city's strength lies not in its skyscrapers, but in the shade of its trees."
//         </blockquote>
//       </section>

//       {/* First Gallery */}
//       <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl px-6 py-12">
//         <img src={barren1} alt="Barren Area 1" className="rounded-2xl shadow-lg" />
//         <img src={barren2} alt="Barren Area 2" className="rounded-2xl shadow-lg" />
//       </section>

//       {/* Story Text */}
//       <section className="max-w-3xl text-center px-6 py-12 space-y-6">
//         <p className="text-gray-700 text-lg leading-relaxed">
//           Once flourishing with trees and public parks, Karachi’s landscape today bears the scars of unchecked development. 
//           The loss of green spaces has led to soaring temperatures, pollution spikes, and weakened community health.
//         </p>
//         <p className="text-gray-700 text-lg leading-relaxed">
//           Yet in the midst of this change, seeds of hope remain.
//         </p>
//       </section>

//       {/* Full Width Image */}
//       <section className="w-full max-w-5xl px-6 py-12">
//         <img src={emptyPlot} alt="Empty Plot" className="rounded-2xl shadow-lg w-full" />
//       </section>

//       {/* Mission Text */}
//       <section className="max-w-3xl text-center px-6 py-12 space-y-6">
//         <p className="text-gray-700 text-lg leading-relaxed">
//           LandGuard connects citizens, students, and NGOs with a growing database of potential plantation sites across Karachi. 
//           From abandoned plots to underutilized parks, every corner of the city holds the promise of renewal.
//         </p>
//       </section>

//       {/* Second Gallery */}
//       <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl px-6 py-12">
//         <img src={plantationEffort1} alt="Plantation Effort 1" className="rounded-2xl shadow-lg" />
//         <img src={plantationEffort2} alt="Plantation Effort 2" className="rounded-2xl shadow-lg" />
//       </section>

//       {/* Big Quote */}
//       <section className="max-w-2xl text-center px-6 py-12">
//         <blockquote className="text-green-700 text-2xl italic font-semibold">
//           "Every sapling planted is a pledge to the future — a promise that Karachi will breathe again."
//         </blockquote>
//       </section>

//       {/* Final Call to Action Text */}
//       <section className="max-w-3xl text-center px-6 py-12 space-y-6">
//         <p className="text-gray-700 text-lg leading-relaxed">
//           By collaborating with passionate individuals and organizations, LandGuard charts the way forward for Karachi's green revival. 
//           Together, we can reclaim the spaces we once loved — and those we have yet to discover.
//         </p>
//       </section>

//       {/* Final Image */}
//       <section className="w-full max-w-5xl px-6 py-12">
//         <img src={futureGreen} alt="Future Green Karachi" className="rounded-2xl shadow-lg w-full" />
//       </section>

//       {/* CTA Button */}
//       <section className="py-20">
//         <Button size="lg" className="bg-green-700 text-white hover:bg-green-800">
//           Explore Plantation Areas
//         </Button>
//       </section>

//     </div>
//   );
// }



import plantationEffort2 from "@/assets/images/CUF_after.png";

export default function StoryPage() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-[90vh] bg-cover bg-center flex items-center justify-center text-white"
        style={{ backgroundImage: `url(${plantationEffort2})` }}
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
      <section className="grid grid-cols-1 md:grid-cols-2 h-auto bg-[#d2a94f] text-black py-20">
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
            src={plantationEffort2}
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
          href="/explore"
          className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 text-lg rounded-full shadow-lg"
        >
          Explore Drives
        </a>
      </section>
    </div>
  );
}
