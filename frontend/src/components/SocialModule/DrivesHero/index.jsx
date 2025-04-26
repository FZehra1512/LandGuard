import { Button } from "@/components/ui/button";
import image2 from "@/assets/images/plant_bg2.png";

export default function DrivesHero() {
  return (
    <section className="relative bg-green-700 text-white pt-28 pb-20 px-6 md:px-12 overflow-hidden">
      <img
        src={image2}
        alt="Drives Background"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Join Plantation Drives
        </h1>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Find events happening near you and contribute to a greener planet!
        </p>
        <Button variant="default" size="lg" className="bg-white text-green-700 font-semibold hover:bg-gray-100">
          + Create a New Drive
        </Button>
      </div>
    </section>
  );
}
