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

export default function DriveCard({ drive }) {
  const { title, location, date, participants, capacity } = drive;

  const [dialogOpen, setDialogOpen] = useState(false);

  const progress = Math.min((participants / capacity) * 100, 100);
  const isFull = participants >= capacity;

  const handleConfirmJoin = () => {
    setDialogOpen(false);
    // You can add your join logic here, like API call
    console.log("User confirmed join!");
  };

  return (
    <div className="relative overflow-hidden bg-white p-6 rounded-2xl shadow-lg flex flex-col gap-5 transition hover:shadow-xl group">

      {/* Decorative Ribbon */}
      <div className="absolute top-0 left-0 bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-br-xl">
        🌱 Plantation Drive
      </div>

      {/* Main Content */}
      <div>
        <h2 className="text-2xl font-bold mt-4 mb-2 group-hover:text-green-700 transition">
          {title}
        </h2>
        <div className="text-gray-600 text-sm mb-1 flex items-center gap-1">
          📍 <span>{location}</span>
        </div>
        <div className="text-gray-600 text-sm flex items-center gap-1">
          📅 <span>{new Date(date).toDateString()}</span>
        </div>
      </div>

      {/* Progress + Join Row */}
      <div className="flex items-center gap-4 mt-2">
        {/* Progress Bar Section */}
        <div className="flex-1">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500">{participants} out of {capacity} participants joined!</div>
        </div>

        {/* Join Button with Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="default"
              size="lg"
              disabled={isFull}
              onClick={() => setDialogOpen(true)}
            >
              {isFull ? "Full" : "Join"}
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
              <Button onClick={handleConfirmJoin}>
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
