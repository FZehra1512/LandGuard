import { Button } from "@/components/ui/button";

export default function DriveCard({ drive }) {
  const { title, location, date, participants, capacity } = drive;
  return (
    <div className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4">
      <div>
        <h2 className="text-2xl font-semibold mb-2">{title}</h2>
        <div className="text-gray-600 text-sm mb-1">📍 {location}</div>
        <div className="text-gray-600 text-sm">📅 {new Date(date).toDateString()}</div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="text-green-700 font-semibold text-sm">
          {participants}/{capacity} Joined
        </div>
        <Button variant="default" size="sm">
          Join Drive
        </Button>
      </div>
    </div>
  );
}
