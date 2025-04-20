import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const LocationPicker = ({ setLocation }) => {
  const [markerPos, setMarkerPos] = useState([24.8607, 67.0011]);
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setMarkerPos([lat, lng]);
      setLocation(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
    },
  });
  return markerPos && <Marker position={markerPos} />;
};

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, location, description, image });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen text-foreground px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2 text-primary tracking-tight">
            Post Your Land for Plantation
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Share an area in need of greenery. Include details, image, and select its location on the map.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-w-3xl mx-auto bg-card p-8 rounded-2xl shadow-lg space-y-6 border border-border"
        >
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-foreground">Title</label>
            <Input
              type="text"
              placeholder="E.g., Open Land near Korangi"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Map Location */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-foreground">Location</label>
            <div className="mb-2 text-sm text-muted-foreground">
              Click on the map to select a location.
            </div>
            <Input
              type="text"
              value={location}
              readOnly
              className="mb-4 cursor-not-allowed"
            />
            <MapContainer
              center={[24.8607, 67.0011]}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: '300px', borderRadius: '1rem' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationPicker setLocation={setLocation} />
            </MapContainer>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-foreground">Description</label>
            <textarea
              rows={5}
              placeholder="Describe the area, greenery situation, any info"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-foreground">Upload Image</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <Button type="submit" className="w-full">
              Submit Post
            </Button>
          </div>
        </form>
      </main>
    </>
  );
};

export default CreatePost;






// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import * as z from "zod";
// import { toast } from "@/hooks/use-toast";
// import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// // Zod schema for form validation
// const postFormSchema = z.object({
//   title: z.string().min(1, "Title is required"),
//   description: z.string().min(10, "Description should be at least 10 characters"),
//   location: z.string().min(1, "Location is required"),
//   imageUrl: z.string().url("Please enter a valid URL for the image"),
// });

// const CreatePost = ({ className, ...props }) => {
//   const [position, setPosition] = useState(null);
//   const form = useForm({
//     resolver: zodResolver(postFormSchema),
//     defaultValues: {
//       title: "",
//       description: "",
//       location: "",
//       imageUrl: "",
//     },
//   });

//   // Custom map event to set position when clicked
//   const handleMapClick = (e) => {
//     setPosition(e.latlng);
//     form.setValue("location", `${e.latlng.lat}, ${e.latlng.lng}`);
//   };

//   // Handle form submission
//   const onSubmit = async (data) => {
//     try {
//       // Call your API or handle data here
//       console.log(data);
//       toast({
//         variant: "success",
//         title: "Success",
//         description: `Post created successfully!`,
//       });
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: error.message || "Failed to create post",
//       });
//     }
//   };

//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <div className="flex flex-col gap-6 p-6">
//         <h1 className="text-3xl font-bold">Create a New Post</h1>
//         <form
//           className="flex flex-col gap-6"
//           onSubmit={form.handleSubmit(onSubmit)}
//           noValidate
//         >
//           <div className="grid gap-2">
//             <Label htmlFor="title">Title</Label>
//             <Input id="title" {...form.register("title")} />
//             {form.formState.errors.title && (
//               <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>
//             )}
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="description">Description</Label>
//             <Input id="description" {...form.register("description")} />
//             {form.formState.errors.description && (
//               <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>
//             )}
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="imageUrl">Image URL</Label>
//             <Input id="imageUrl" {...form.register("imageUrl")} />
//             {form.formState.errors.imageUrl && (
//               <p className="text-sm text-destructive">{form.formState.errors.imageUrl.message}</p>
//             )}
//           </div>

//           {/* Map */}
//           <div className="relative h-64">
//             <MapContainer
//               center={[51.505, -0.09]}
//               zoom={13}
//               className="h-full"
//               onClick={handleMapClick}
//             >
//               <TileLayer
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//               />
//               {position && <Marker position={position} />}
//             </MapContainer>
//           </div>

//           <Button
//             type="submit"
//             className="w-full"
//             disabled={form.formState.isSubmitting}
//           >
//             {form.formState.isSubmitting ? "Creating Post..." : "Create Post"}
//           </Button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreatePost;
