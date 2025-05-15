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
import { toast } from "@/hooks/use-toast";
import { deleteDrive } from "@/api/SocialDataEndpoints";

export default function UserDriveCard({ drive, onDriveDeleted }) {
  const { _id, title, location, dateTime, participants, capacity, organizerName, contact } = drive;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const progress = Math.min((participants / capacity) * 100, 100);

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await deleteDrive(_id);
      toast({
        variant: "success",
        title: "Drive Deleted",
        description: "Your plantation drive has been deleted successfully.",
      });
      setDialogOpen(false);
      onDriveDeleted?.(_id); // Notify parent to remove the drive from UI
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Delete Failed",
        description: error.message || "Something went wrong.",
      });
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="relative overflow-hidden bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-5 transition hover:shadow-xl group">
      {/* Tag */}
      <div className="absolute top-0 left-0 bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-br-xl">
        🌿 Your Drive
      </div>

      {/* Main Details */}
      <div>
        <h2 className="text-2xl font-bold mt-4 mb-2 group-hover:text-blue-700 transition">
          {title}
        </h2>
        <div className="text-gray-600 text-sm mb-1 flex items-center gap-1">
          📍 <span>{location}</span>
        </div>
        <div className="text-gray-600 text-sm flex items-center gap-1">
          📅 <span>{new Date(dateTime).toDateString()}</span>
        </div>
        <div className="text-gray-600 text-sm mt-2 flex items-center gap-1">
          👤 <span>Organizer: {organizerName}</span>
        </div>
        <div className="text-gray-600 text-sm flex items-center gap-1">
          📞 <span>Contact: {contact}</span>
        </div>
      </div>

      {/* Progress & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-2">
        {/* Progress Bar */}
        <div className="flex-1">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-gray-500">{participants} / {capacity} participants</div>
        </div>

        {/* Delete Button with Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive" onClick={() => setDialogOpen(true)}>
              Delete
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Drive</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this drive? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
                {deleting ? "Deleting..." : "Confirm Delete"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
