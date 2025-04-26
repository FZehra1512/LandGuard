import { Input } from "@/components/ui/input";
import DropdownFilter from "../DropdownFilter";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
  } from "@/components/ui/dropdown-menu";
  

// export default function FilterBar() {
//     return (
//       <div className="relative z-10 -mt-12">
//         <div className="container mx-auto px-6 md:px-12">
//           <div className="bg-white p-4 shadow-md rounded-xl flex flex-wrap items-center gap-4">
//             <Input
//               placeholder="Search by location, type, or tags"
//               className="flex-1 min-w-[200px]"
//             />
//             {/* <Button variant="outline" className="flex items-center gap-2">
//               Type <ChevronDown size={16} />
//             </Button>
//             <Button variant="outline" className="flex items-center gap-2">
//               Area <ChevronDown size={16} />
//             </Button>
//             <Button variant="outline" className="flex items-center gap-2">
//               Availability
//             </Button> */}
//           </div>
//         </div>
//       </div>
//     );
//   }
  

export default function FilterBar() {
  const typeOptions = ["Home Garden", "Empty Plot", "Roadside Spot"];
  const areaOptions = ["Urban", "Rural", "Suburban"];
  const availabilityOptions = ["Available", "Not Available"];

  return (
    <div className="relative z-10 -mt-12">
      <div className="container mx-auto px-6 md:px-12">
        <div className="bg-white p-4 shadow-md rounded-xl flex flex-wrap items-center gap-4">
          <Input
            placeholder="Search by location, type, or tags"
            className="flex-1 min-w-[200px]"
          />

          {/* Use DropdownFilter for each filter */}
          <DropdownFilter label="Type" options={typeOptions} />
          <DropdownFilter label="Area" options={areaOptions} />
          <DropdownFilter label="Availability" options={availabilityOptions} />
        </div>
      </div>
    </div>
  );
}

