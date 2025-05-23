"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAuth } from "@/providers/AuthProvider";
import { toast } from "@/hooks/use-toast";
import { joinDrive } from "@/api/SocialDataEndpoints";

export default function DriveCard({ drive, refreshDrives }) {
  const {
    title,
    location,
    dateTime,
    participants = [],
    capacity,
    organizerName,
    contact,
  } = drive;

  const [dialogOpen, setDialogOpen] = useState(false);
  const { userDetails } = useAuth();

  const participantsCount = participants.length;
  const progress = Math.min((participantsCount / capacity) * 100, 100);
  const isFull = participantsCount >= capacity;
  const alreadyJoined = false;

  const handleConfirmJoin = async () => {
    try {
      await joinDrive(drive._id); // API call to backend to join

      toast({
        variant: "success",
        title: "Joined!",
        description: "You’ve successfully joined this drive 🌱",
      });

      setDialogOpen(false);

      // ✅ Call refreshDrives to update the list
      if (refreshDrives) refreshDrives();

    } catch (err) {
      toast({
        variant: "destructive",
        title: "Failed to Join",
        description: err.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="relative overflow-hidden bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-5 transition hover:shadow-xl group">
      <div className="absolute top-0 left-0 bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-br-xl">
        🌱 Plantation Drive
      </div>

      <div>
        <h2 className="text-2xl font-bold mt-4 mb-2 group-hover:text-green-700 transition">
          {title}
        </h2>
        <div className="text-gray-600 text-sm mb-1 flex items-center gap-1">
          📍 <span>{location}</span>
        </div>
        <div className="text-gray-600 text-sm flex items-center gap-1">
          📅 <span>{new Date(dateTime).toDateString()}</span>
        </div>
        <div className="text-gray-600 text-sm mb-1 mt-2 flex items-center gap-1">
          👤 <span>Organizer: {organizerName}</span>
        </div>
        <div className="text-gray-600 text-sm flex items-center gap-1">
          📞 <span>Contact: {contact}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-2">
        <div className="flex-1">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500">
            {participantsCount} out of {capacity} participants joined!
          </div>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="default"
              size="lg"
              disabled={isFull || alreadyJoined}
              onClick={() => setDialogOpen(true)}
            >
              {isFull ? "Full" : alreadyJoined ? "Joined" : "Join"}
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Join</DialogTitle>
              <DialogDescription>
                Are you sure you want to join this plantation drive?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleConfirmJoin}>Confirm</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
