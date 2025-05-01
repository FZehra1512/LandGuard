// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";

// // Images
// import barrenKarachi from "@/assets/images/CUF_Before.png";
// import beforeGreen from "@/assets/images/CUF_after.png";
// import afterConcrete from "@/assets/images/CUF_after.png";
// import ngoWork from "@/assets/images/CUF_after.png";
// import studentsPlanting from "@/assets/images/CUF_after.png";
// import urbanForest from "@/assets/images/CUF_after.png";
// import heroBackground from "@/assets/images/CUF_after.png";

// export default function StoryPage() {
//   return (
//     <div className="flex flex-col gap-32">

//       {/* Hero Section */}
//       <section className="relative h-[90vh] flex items-center justify-center text-white">
//         <img src={heroBackground} alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-70" />
//         <div className="relative text-center p-6">
//           <h1 className="text-5xl font-bold mb-6">Karachi's Lost Forests</h1>
//           <p className="text-2xl">From concrete jungles to green rebirth.</p>
//         </div>
//       </section>

//       {/* The Problem */}
//       <section className="container mx-auto flex flex-col md:flex-row items-center gap-12 px-6">
//         <div className="flex-1 space-y-6">
//           <h2 className="text-4xl font-bold">The Price of Urbanization</h2>
//           <p className="text-gray-700 text-lg">
//             Karachi’s natural landscapes have been replaced by sprawling concrete, rising pollution, and disappearing ecosystems. Parks, gardens, and public grounds were sacrificed in the race for urban expansion.
//           </p>
//         </div>
//         <div className="flex-1 grid grid-cols-2 gap-6">
//           <img src={beforeGreen} alt="Before Green" className="rounded-xl shadow-md" />
//           <img src={afterConcrete} alt="After Urbanization" className="rounded-xl shadow-md" />
//         </div>
//       </section>

//       {/* Our Mission */}
//       <section className="bg-green-50 py-20 px-6 text-center space-y-8">
//         <h2 className="text-4xl font-bold">A Platform for Action</h2>
//         <p className="text-gray-700 max-w-2xl mx-auto text-lg">
//           LandGuard empowers individuals, students, and NGOs by mapping areas in need of greenery, providing a digital bridge to restoration efforts across Karachi.
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 max-w-6xl mx-auto">
//           <div className="flex flex-col items-center gap-4">
//             <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-bold text-2xl">📍</div>
//             <h4 className="text-xl font-semibold">Find Spaces</h4>
//           </div>
//           <div className="flex flex-col items-center gap-4">
//             <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-bold text-2xl">🤝</div>
//             <h4 className="text-xl font-semibold">Support NGOs</h4>
//           </div>
//           <div className="flex flex-col items-center gap-4">
//             <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-bold text-2xl">🌱</div>
//             <h4 className="text-xl font-semibold">Drive Change</h4>
//           </div>
//         </div>
//       </section>

//       {/* Changemakers */}
//       <section className="container mx-auto px-6">
//         <h2 className="text-4xl font-bold text-center mb-12">Changemakers</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//           {[ 
//             { title: "Clifton Urban Forest", img: urbanForest },
//             { title: "NGO Drives", img: ngoWork },
//             { title: "Student Planting Groups", img: studentsPlanting }
//           ].map((item, idx) => (
//             <Card key={idx} className="hover:shadow-lg transition-shadow">
//               <CardContent className="p-4 flex flex-col items-center text-center gap-4">
//                 <img src={item.img} alt={item.title} className="rounded-xl w-full h-48 object-cover" />
//                 <h4 className="font-semibold text-lg">{item.title}</h4>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="bg-green-700 py-20 text-center text-white space-y-6">
//         <h2 className="text-4xl font-bold">Be Part of Karachi's Green Future</h2>
//         <p className="max-w-2xl mx-auto text-lg">
//           Map, post, and participate — every small action creates a greener tomorrow.
//         </p>
//         <Button size="lg" className="bg-white text-green-700 font-semibold hover:bg-gray-100">
//           Start Exploring
//         </Button>
//       </section>

//     </div>
//   );
// }







import { Button } from "@/components/ui/button";

// Images
import heroImage from "@/assets/images/contact_page_img.png";
import barren1 from "@/assets/images/CUF_Before.png";
import barren2 from "@/assets/images/CUF_Before.png";
import emptyPlot from "@/assets/images/CUF_Before.png";
import plantationEffort1 from "@/assets/images/CUF_after.png";
import plantationEffort2 from "@/assets/images/CUF_after.png";
import futureGreen from "@/assets/images/CUF_after.png";

export default function StoryPage() {
  return (
    <div className="bg-[#FAF9F5] flex flex-col items-center">

      {/* Hero Section */}
      <section className="relative w-full h-[75vh] flex items-center justify-center bg-green-800 text-white">
        <img src={heroImage} alt="LandGuard Hero" className="absolute inset-0 w-full h-full object-cover opacity-70" />
        <div className="relative text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold">Reviving Karachi's Lost Green Spaces</h1>
          <p className="text-lg md:text-2xl mt-4">LandGuard: Mapping the path back to nature</p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="text-center max-w-3xl px-6 py-16 space-y-4">
        <div className="flex justify-center gap-8 text-green-800 font-bold text-xl md:text-2xl">
          <div>60% Green Cover Lost</div>
          <div>1200+ Public Grounds Surveyed</div>
          <div>300+ Volunteer Drives</div>
        </div>
        <p className="text-gray-700 mt-6 text-lg leading-relaxed">
          Karachi’s ecosystem has faced severe depletion due to rapid urban growth. With the help of volunteers, NGOs, and concerned citizens, 
          LandGuard maps spaces that are ready for transformation — bringing hope back into the city's heart.
        </p>
      </section>

      {/* Quote Section */}
      <section className="max-w-2xl text-center px-6 py-12">
        <blockquote className="text-green-700 text-2xl italic font-semibold">
          "The true measure of a city's strength lies not in its skyscrapers, but in the shade of its trees."
        </blockquote>
      </section>

      {/* First Gallery */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl px-6 py-12">
        <img src={barren1} alt="Barren Area 1" className="rounded-2xl shadow-lg" />
        <img src={barren2} alt="Barren Area 2" className="rounded-2xl shadow-lg" />
      </section>

      {/* Story Text */}
      <section className="max-w-3xl text-center px-6 py-12 space-y-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          Once flourishing with trees and public parks, Karachi’s landscape today bears the scars of unchecked development. 
          The loss of green spaces has led to soaring temperatures, pollution spikes, and weakened community health.
        </p>
        <p className="text-gray-700 text-lg leading-relaxed">
          Yet in the midst of this change, seeds of hope remain.
        </p>
      </section>

      {/* Full Width Image */}
      <section className="w-full max-w-5xl px-6 py-12">
        <img src={emptyPlot} alt="Empty Plot" className="rounded-2xl shadow-lg w-full" />
      </section>

      {/* Mission Text */}
      <section className="max-w-3xl text-center px-6 py-12 space-y-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          LandGuard connects citizens, students, and NGOs with a growing database of potential plantation sites across Karachi. 
          From abandoned plots to underutilized parks, every corner of the city holds the promise of renewal.
        </p>
      </section>

      {/* Second Gallery */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl px-6 py-12">
        <img src={plantationEffort1} alt="Plantation Effort 1" className="rounded-2xl shadow-lg" />
        <img src={plantationEffort2} alt="Plantation Effort 2" className="rounded-2xl shadow-lg" />
      </section>

      {/* Big Quote */}
      <section className="max-w-2xl text-center px-6 py-12">
        <blockquote className="text-green-700 text-2xl italic font-semibold">
          "Every sapling planted is a pledge to the future — a promise that Karachi will breathe again."
        </blockquote>
      </section>

      {/* Final Call to Action Text */}
      <section className="max-w-3xl text-center px-6 py-12 space-y-6">
        <p className="text-gray-700 text-lg leading-relaxed">
          By collaborating with passionate individuals and organizations, LandGuard charts the way forward for Karachi's green revival. 
          Together, we can reclaim the spaces we once loved — and those we have yet to discover.
        </p>
      </section>

      {/* Final Image */}
      <section className="w-full max-w-5xl px-6 py-12">
        <img src={futureGreen} alt="Future Green Karachi" className="rounded-2xl shadow-lg w-full" />
      </section>

      {/* CTA Button */}
      <section className="py-20">
        <Button size="lg" className="bg-green-700 text-white hover:bg-green-800">
          Explore Plantation Areas
        </Button>
      </section>

    </div>
  );
}
