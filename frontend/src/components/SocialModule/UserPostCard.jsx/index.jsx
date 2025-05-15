"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MapPin, Info, Trash2 } from "lucide-react";

const UserPostCard = ({ post, onDelete }) => {
  const { title, image, description, location, username, contact, _id } = post;

  const hasCoordinates = location?.latitude && location?.longitude;

  const mapThumbnail = hasCoordinates
    ? `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=15&size=400x200&maptype=roadmap&markers=color:green%7C${location.latitude},${location.longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    : null;

  const googleMapsLink = hasCoordinates
    ? `https://www.google.com/maps?q=${location.latitude},${location.longitude}`
    : null;

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card className="group relative transition duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 border-none rounded-3xl overflow-hidden bg-white">
      <div className="relative">
        <img
          src={image || "https://via.placeholder.com/400x200?text=No+Image"}
          alt={title}
          className="w-full h-48 object-cover"
        />
      </div>

      <div className="p-5 space-y-2">
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
          {title || "Untitled Post"}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>

        <div className="flex gap-2 mt-4">
          <Button
            variant="ghost"
            className="w-full border border-green-600 text-green-700 hover:bg-green-50 rounded-xl"
            onClick={() => setIsModalOpen(true)}
          >
            <Info className="w-4 h-4 mr-1" />
            View Details
          </Button>

          <Button
            variant="destructive"
            className="rounded-xl"
            onClick={() => onDelete(_id)}
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Location on Map</DialogTitle>
          </DialogHeader>

          {mapThumbnail && (
            <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
              <img
                src={mapThumbnail}
                alt="Map location"
                className="w-full h-60 object-cover rounded-lg border"
              />
            </a>
          )}

          <div className="mt-4 text-sm text-gray-700 space-y-1">
            {username && (
              <p>
                <strong>Posted by:</strong> {username}
              </p>
            )}
            {contact && (
              <p>
                <strong>Contact:</strong> {contact}
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default UserPostCard;
