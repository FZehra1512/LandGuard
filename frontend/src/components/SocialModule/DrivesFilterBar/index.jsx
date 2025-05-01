import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function DrivesFilterBar() {
  return (
    <div className="bg-white p-4 shadow-md rounded-xl relative flex flex-wrap items-center gap-4">
      <Input
        placeholder="Search drives by location or title"
        className="flex-1 min-w-[200px]"
      />
      <Button variant="outline" className="flex items-center gap-2">
        Location <ChevronDown size={16} />
      </Button>
      <Button variant="outline" className="flex items-center gap-2">
        Date <ChevronDown size={16} />
      </Button>
    </div>
  );
}
