import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  ZoomControl,
  useMapEvents
} from 'react-leaflet';
import L from 'leaflet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { createLandPost } from '@/api/SocialDataEndpoints';
import SearchBox from '@/components/SocialModule/FormSearch';
import 'leaflet/dist/leaflet.css';

// Fix leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const phoneRegex = /^03[0-9]{9}$/;

// Schema
const postSchema = z.object({
  title: z.string().min(3),
  location: z.string().nonempty("Location is required"),
  description: z.string().min(10),
  contact: z
      .string()
      .regex(phoneRegex, "Enter a valid Pakistani number (e.g., 03XXXXXXXXX)"),
  image: z.instanceof(File, { message: "Image is required" }),
});


const LocationPicker = ({ markerPos, setMarkerPos, onLocationSelect }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      const newPos = [lat, lng];
      setMarkerPos(newPos);
      onLocationSelect(`${lat.toFixed(5)}, ${lng.toFixed(5)}`);
    },
  });

  return <Marker position={markerPos} />;
};

const CreatePost = () => {
  const [markerPos, setMarkerPos] = useState([24.8607, 67.0011]);

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
      contact: '',
      image: undefined,
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('location', data.location);
    formData.append('contact', data.contact);
    formData.append('description', data.description);
    if (data.image) {
      formData.append('image', data.image);
    }

    const res = await createLandPost(formData);
    if (res.code === 200 || res.code === 201) {
      toast({
        variant: "success",
        title: "Success",
        description: "Post submitted successfully",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: res.data?.message || "Error submitting post",
      });
    }
  };

  const handleSearchLocation = (coords) => {
    setMarkerPos(coords);
    setValue('location', `${coords[0].toFixed(5)}, ${coords[1].toFixed(5)}`);
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
            <div className="text-sm text-muted-foreground mb-2">Search or click on the map to pick coordinates.</div>
            <Input
              readOnly
              className="mb-4 cursor-not-allowed"
              value={watch('location')}
            />
            <div className="relative">
              <MapContainer
                center={markerPos}
                zoom={13}
                scrollWheelZoom={true}
                style={{ height: '400px', borderRadius: '1rem' }}
                zoomControl={false} // Disable default zoom controls
              >
                <TileLayer
                  attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ZoomControl position="bottomright" /> {/* Add zoom controls back in bottom-right */}
                <SearchBox setSearchLocation={handleSearchLocation} />
                <LocationPicker
                  markerPos={markerPos}
                  setMarkerPos={setMarkerPos}
                  onLocationSelect={(loc) => setValue('location', loc)}
                />
              </MapContainer>

            </div>
            {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-semibold mb-1">Contact Information</label>
            <Input {...register("contact")} placeholder="Phone number or email" />
            {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>}
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
