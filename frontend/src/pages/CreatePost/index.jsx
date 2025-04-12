import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import Navbar from '@/components/Navbar';

// Fix default marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const LocationPicker = ({ setLocation }) => {
  const [markerPos, setMarkerPos] = useState([24.8607, 67.0011]); // Default: Karachi

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
    // e.preventDefault();
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
          <input
            type="text"
            placeholder="E.g., Open Land near Korangi"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl bg-white border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Map Location */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-foreground">Location</label>
          <div className="mb-2 text-sm text-muted-foreground">
            Click on the map to select a location.
          </div>
          <input
            type="text"
            value={location}
            readOnly
            className="w-full px-4 py-2 rounded-xl border border-border mb-4 cursor-not-allowed"
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
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-opacity-90"
          />
        </div>

        {/* Submit */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:bg-opacity-90 transition"
          >
            Submit Post
          </button>
        </div>
      </form>
    </main>
    </>
  );
};

export default CreatePost;
