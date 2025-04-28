// "use client";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import barren1 from "@/assets/images/CUF_Before.png";
// import barren2 from "@/assets/images/CUF_Before.png";
// import effort1 from "@/assets/images/CUF_after.png";
// import effort2 from "@/assets/images/CUF_after.png";

// const barrenImages = [
//   { src: barren1, caption: "Lost landscapes of Karachi." },
//   { src: barren2, caption: "Concrete replacing nature." },
// ];

// const effortsImages = [
//   { src: effort1, caption: "Students nurturing a greener future." },
//   { src: effort2, caption: "NGOs reviving Karachi's lungs." },
// ];

// export default function StoryPage({ className, ...props }) {
//   return (
//     <div className={cn("w-full overflow-hidden", className)} {...props}>
//       {/* Hero Section */}
//       <section className="relative w-full h-screen bg-black text-white flex flex-col justify-center items-center">
//         <Image
//           src={barren1}
//           alt="Karachi Barren Land"
//           layout="fill"
//           objectFit="cover"
//           objectPosition="center"
//           className="opacity-30"
//           priority
//         />
//         <div className="relative z-10 text-center">
//           <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-down">
//             From Barren to Bloom
//           </h1>
//           <p className="text-lg md:text-2xl max-w-2xl mx-auto text-muted-foreground animate-fade-in-up">
//             Karachi's journey back to green life starts here.
//           </p>
//         </div>
//         <div className="absolute bottom-10 animate-bounce">
//           <span className="text-sm">Scroll to Discover ↓</span>
//         </div>
//       </section>

//       {/* Wave Divider */}
//       <div className="w-full">
//         <svg viewBox="0 0 1440 320" className="fill-muted">
//           <path fillOpacity="1" d="M0,64L48,85.3C96,107,192,149,288,149.3C384,149,480,107,576,112C672,117,768,171,864,186.7C960,203,1056,181,1152,176C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
//         </svg>
//       </div>

//       {/* Loss of Nature Section */}
//       <section className="bg-muted py-16 px-6 md:px-20 flex flex-col gap-12">
//         <div className="text-center">
//           <h2 className="text-4xl font-bold mb-4">Where Green Once Stood</h2>
//           <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
//             As the city expanded, our forests and parks disappeared under concrete giants.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-10">
//           {barrenImages.map((img, index) => (
//             <div key={index} className="group relative overflow-hidden rounded-3xl shadow-lg">
//               <Image
//                 src={img.src}
//                 alt={img.caption}
//                 width={600}
//                 height={400}
//                 className="object-cover w-full h-72 transition-transform duration-500 group-hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
//                 <p className="text-white text-center text-xl">{img.caption}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Urbanization Impact Section */}
//       <section className="relative bg-black text-white py-20 px-6 md:px-20 text-center">
//         <h2 className="text-4xl font-bold mb-6">The Cost of Growth</h2>
//         <p className="text-lg max-w-3xl mx-auto mb-10 text-muted-foreground">
//           Rampant construction has stripped Karachi of its natural shields. Higher temperatures, worse floods, harsher lives.
//         </p>
//         <div className="flex justify-center">
//           <div className="grid grid-cols-2 gap-10 text-center">
//             <div>
//               <h3 className="text-5xl font-bold text-green-400">80%</h3>
//               <p className="mt-2 text-muted-foreground">Green cover lost</p>
//             </div>
//             <div>
//               <h3 className="text-5xl font-bold text-green-400">50°C</h3>
//               <p className="mt-2 text-muted-foreground">Projected summers</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Another Wave Divider */}
//       <div className="w-full">
//         <svg viewBox="0 0 1440 320" className="fill-background rotate-180">
//           <path fillOpacity="1" d="M0,288L48,272C96,256,192,224,288,186.7C384,149,480,107,576,112C672,117,768,171,864,202.7C960,235,1056,245,1152,229.3C1248,213,1344,171,1392,149.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
//         </svg>
//       </div>

//       {/* Inspiring Efforts */}
//       <section className="py-16 px-6 md:px-20">
//         <div className="text-center">
//           <h2 className="text-4xl font-bold mb-4">Seeds of Hope</h2>
//           <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
//             Karachi fights back through passionate souls - NGOs, students, citizens all planting life back into our soil.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-10 mt-10">
//           {effortsImages.map((img, index) => (
//             <div key={index} className="rounded-3xl overflow-hidden shadow-lg group relative">
//               <Image
//                 src={img.src}
//                 alt={img.caption}
//                 width={600}
//                 height={400}
//                 className="object-cover w-full h-72 group-hover:scale-105 transition-transform duration-500"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
//                 <p className="text-white text-center text-xl">{img.caption}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Final Call to Action */}
//       <section className="bg-green-600 text-white py-20 px-6 md:px-20 text-center">
//         <h2 className="text-4xl font-bold mb-6">Plant the Change</h2>
//         <p className="text-lg max-w-2xl mx-auto mb-8">
//           Every seed sown is a breath of fresh hope. Step forward. Make Karachi bloom again.
//         </p>
//         <Button className="bg-white text-green-600 hover:bg-gray-200 text-lg px-10 py-4 rounded-full" asChild>
//           <a href="/explore-drives">Join a Drive</a>
//         </Button>
//       </section>
//     </div>
//   );
// }





// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";

// // Importing images
// import barrenKarachi from "@/assets/images/CUF_Before.png";
// import beforeGreen from "@/assets/images/CUF_Before.png";
// import afterConcrete from "@/assets/images/CUF_Before.png";
// import emptyGround from "@/assets/images/CUF_Before.png";
// import barrenPark from "@/assets/images/CUF_Before.png";
// import publicSpace from "@/assets/images/CUF_Before.png";
// import ngo1 from "@/assets/images/CUF_Before.png";
// import students1 from "@/assets/images/CUF_Before.png";
// import ngo2 from "@/assets/images/CUF_Before.png";

// export default function StoryPage() {
//   return (
//     <div className="flex flex-col gap-16 p-6 md:p-12">

//       {/* Hero Section */}
//       <section className="relative h-[80vh] flex items-center justify-center bg-black rounded-3xl overflow-hidden shadow-lg">
//         <img
//           src={barrenKarachi}
//           alt="Barren Karachi Land"
//           className="absolute inset-0 w-full h-full object-cover opacity-60"
//         />
//         <div className="relative text-center text-white p-8">
//           <h1 className="text-4xl md:text-6xl font-bold mb-4">Reviving Karachi's Green Spaces</h1>
//           <p className="text-lg md:text-2xl max-w-2xl mx-auto">
//             A journey to reclaim our city's natural soul.
//           </p>
//         </div>
//       </section>

//       {/* Problem Section */}
//       <section className="flex flex-col md:flex-row gap-8 items-center">
//         <div className="flex-1">
//           <h2 className="text-3xl font-bold mb-4">The Price of Urbanization</h2>
//           <p className="text-gray-700 text-lg">
//             Over the decades, Karachi has rapidly urbanized, often at the cost of its green spaces. 
//             Areas once lush with trees have given way to barren plots and concrete structures, 
//             leading to rising temperatures, pollution, and a declining quality of life.
//           </p>
//         </div>
//         <div className="flex-1 grid grid-cols-2 gap-4">
//           <img src={beforeGreen} alt="Before - Green Area" className="rounded-xl shadow-md" />
//           <img src={afterConcrete} alt="After - Urbanized Area" className="rounded-xl shadow-md" />
//         </div>
//       </section>

//       {/* Mission Section */}
//       <section className="text-center">
//         <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
//         <p className="text-gray-700 max-w-2xl mx-auto text-lg mb-8">
//           LandGuard empowers citizens, NGOs, and students by mapping areas in need of plantation across Karachi. 
//           Together, we can revive abandoned spaces and reshape the future of our city.
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <img src={emptyGround} alt="Empty Ground" className="rounded-xl shadow-md" />
//           <img src={barrenPark} alt="Barren Park" className="rounded-xl shadow-md" />
//           <img src={publicSpace} alt="Public Space" className="rounded-xl shadow-md" />
//         </div>
//       </section>

//       {/* Impact Section */}
//       <section>
//         <h2 className="text-3xl font-bold mb-8 text-center">Changemakers</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {[
//             { title: "Green Karachi Movement", desc: "Plantation drives across parks", img: ngo1 },
//             { title: "Student Planting Initiative", desc: "University-led tree plantations", img: students1 },
//             { title: "Urban Forest Foundation", desc: "Micro-forests across Karachi", img: ngo2 },
//           ].map((item, idx) => (
//             <Card key={idx} className="hover:shadow-lg transition-shadow">
//               <CardContent className="p-4 flex flex-col items-center text-center gap-4">
//                 <img src={item.img} alt={item.title} className="rounded-xl object-cover w-full h-48" />
//                 <h3 className="font-semibold text-xl">{item.title}</h3>
//                 <p className="text-gray-600 text-sm">{item.desc}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </section>

//       {/* Call to Action */}
//       <section className="text-center py-12">
//         <h2 className="text-3xl font-bold mb-4">Be a Part of the Change</h2>
//         <p className="text-gray-700 max-w-xl mx-auto mb-8 text-lg">
//           Explore areas in need, post about plantation opportunities, and help Karachi breathe again.
//         </p>
//         <Button size="lg" className="text-white bg-green-600 hover:bg-green-700">
//           Start Exploring
//         </Button>
//       </section>
      
//     </div>
//   );
// }





import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Images
import barrenKarachi from "@/assets/images/CUF_Before.png";
import beforeGreen from "@/assets/images/CUF_after.png";
import afterConcrete from "@/assets/images/CUF_after.png";
import ngoWork from "@/assets/images/CUF_after.png";
import studentsPlanting from "@/assets/images/CUF_after.png";
import urbanForest from "@/assets/images/CUF_after.png";
import heroBackground from "@/assets/images/CUF_after.png";

export default function StoryPage() {
  return (
    <div className="flex flex-col gap-32">

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center text-white">
        <img src={heroBackground} alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-70" />
        <div className="relative text-center p-6">
          <h1 className="text-5xl font-bold mb-6">Karachi's Lost Forests</h1>
          <p className="text-2xl">From concrete jungles to green rebirth.</p>
        </div>
      </section>

      {/* The Problem */}
      <section className="container mx-auto flex flex-col md:flex-row items-center gap-12 px-6">
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl font-bold">The Price of Urbanization</h2>
          <p className="text-gray-700 text-lg">
            Karachi’s natural landscapes have been replaced by sprawling concrete, rising pollution, and disappearing ecosystems. Parks, gardens, and public grounds were sacrificed in the race for urban expansion.
          </p>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-6">
          <img src={beforeGreen} alt="Before Green" className="rounded-xl shadow-md" />
          <img src={afterConcrete} alt="After Urbanization" className="rounded-xl shadow-md" />
        </div>
      </section>

      {/* Our Mission */}
      <section className="bg-green-50 py-20 px-6 text-center space-y-8">
        <h2 className="text-4xl font-bold">A Platform for Action</h2>
        <p className="text-gray-700 max-w-2xl mx-auto text-lg">
          LandGuard empowers individuals, students, and NGOs by mapping areas in need of greenery, providing a digital bridge to restoration efforts across Karachi.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 max-w-6xl mx-auto">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-bold text-2xl">📍</div>
            <h4 className="text-xl font-semibold">Find Spaces</h4>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-bold text-2xl">🤝</div>
            <h4 className="text-xl font-semibold">Support NGOs</h4>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-bold text-2xl">🌱</div>
            <h4 className="text-xl font-semibold">Drive Change</h4>
          </div>
        </div>
      </section>

      {/* Changemakers */}
      <section className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Changemakers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[ 
            { title: "Clifton Urban Forest", img: urbanForest },
            { title: "NGO Drives", img: ngoWork },
            { title: "Student Planting Groups", img: studentsPlanting }
          ].map((item, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-4 flex flex-col items-center text-center gap-4">
                <img src={item.img} alt={item.title} className="rounded-xl w-full h-48 object-cover" />
                <h4 className="font-semibold text-lg">{item.title}</h4>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-green-700 py-20 text-center text-white space-y-6">
        <h2 className="text-4xl font-bold">Be Part of Karachi's Green Future</h2>
        <p className="max-w-2xl mx-auto text-lg">
          Map, post, and participate — every small action creates a greener tomorrow.
        </p>
        <Button size="lg" className="bg-white text-green-700 font-semibold hover:bg-gray-100">
          Start Exploring
        </Button>
      </section>

    </div>
  );
}
