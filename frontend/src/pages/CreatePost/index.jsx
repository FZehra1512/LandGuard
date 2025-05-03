import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast";
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { createLandPost } from '@/api/SocialDataEndpoints';
import 'leaflet/dist/leaflet.css';

// Leaflet Marker Config
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Schema
const postSchema = z.object({
  title: z.string().min(3),
  location: z.string().nonempty("Location is required"),
  description: z.string().min(10),
  image: z.instanceof(File).optional(),
});

const LocationPicker = ({ onLocationSelect }) => {
  const [markerPos, setMarkerPos] = useState([24.8607, 67.0011]);
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setMarkerPos([lat, lng]);
      onLocationSelect(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
    },
  });
  return <Marker position={markerPos} />;
};

const CreatePost = () => {
  const [mapLocation, setMapLocation] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: '',
      location: '',
      description: '',
      image: undefined,
    },
  });

  // const onSubmit = (data) => {
  //   const formData = new FormData();
  //   formData.append('title', data.title);
  //   formData.append('location', data.location);
  //   formData.append('description', data.description);
  //   if (data.image) {
  //     formData.append('image', data.image);
  //   }

  //   // 🚀 Send formData to backend via fetch or axios
  //   console.log('Form submitted:', data);
  // };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('location', data.location);
    formData.append('description', data.description);
    if (data.image) {
      formData.append('image', data.image);
    }
  
    const res = await createLandPost(formData);
    if (res.code === 200 || res.code === 201) {
      console.log('Post submitted successfully');
      toast({
        variant: "success",
        title: "Success",
        description: "Post submitted successfully",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Error submitting post:",
      });
      console.error('Error submitting post:', res.data);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-primary">Post Your Land for Plantation</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Share an area in need of greenery. Include details, image, and select its location on the map.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto bg-card p-8 rounded-2xl shadow-lg border space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-1">Title</label>
            <Input {...register("title")} placeholder="E.g., Empty plot in Clifton" />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold mb-2">Location</label>
            <div className="text-sm text-muted-foreground mb-2">Click on the map to pick coordinates.</div>
            <Input
              readOnly
              className="mb-4 cursor-not-allowed"
              value={watch('location')}
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
              <LocationPicker onLocationSelect={(loc) => {
                setMapLocation(loc);
                setValue('location', loc);
              }} />
            </MapContainer>
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-1">Description</label>
            <Textarea
              {...register("description")}
              placeholder="Explain the condition of land and nearby area"
              className="resize-none"
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
          </div>


          {/* Image Upload */}
          <div>
            <label className="block text-sm font-semibold mb-1">Upload Image</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setValue('image', e.target.files[0])}
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
          </div>

          <Button type="submit" className="w-full">
            Submit Post
          </Button>
        </form>
      </main>
    </>
  );
};

export default CreatePost;
