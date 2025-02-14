// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// import { toast } from "@/hooks/use-toast";
// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// const locations = [
//   { id: "recents", label: "Recents" },
//   { id: "home", label: "Home" },
//   { id: "applications", label: "Applications" },
//   { id: "desktop", label: "Desktop" },
//   { id: "downloads", label: "Downloads" },
//   { id: "documents", label: "Documents" },
// ];

// const FormSchema = z.object({
//   locations: z.array(z.string()).refine((value) => value.length > 0, {
//     message: "You have to select at least one location.",
//   }),
// });

// const UpdateNDVI = () => {
//   const form = useForm({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       locations: ["recents", "home"],
//     },
//   });

//   function onSubmit(data) {
//     console.log("in submit", data);
//     toast({
//       title: "You submitted the following values:",
//       description: (
//         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//           <code className="text-white">{JSON.stringify(data, null, 2)}</code>
//         </pre>
//       ),
//     });
//   }

//   return (
//     <div className="w-full h-full">
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//           <FormField
//             control={form.control}
//             name="locations"
//             render={() => (
//               <FormItem>
//                 <div className="mb-4">
//                   <FormLabel className="text-4xl font-bold">
//                     NDVI Locations
//                   </FormLabel>
//                   <FormDescription className="my-4 text-base text-foreground">
//                     Select the places for which you want to update the NDVI.
//                   </FormDescription>
//                 </div>
//                 {locations.map((location) => (
//                   <FormField
//                     key={location.id}
//                     control={form.control}
//                     name="locations"
//                     render={({ field }) => (
//                       <FormItem className="flex flex-row items-center space-x-3 space-y-0">
//                         <FormControl>
//                           <Checkbox
//                             checked={field.value?.includes(location.id)}
//                             onCheckedChange={(checked) => {
//                               return checked
//                                 ? field.onChange([...field.value, location.id])
//                                 : field.onChange(
//                                     field.value?.filter(
//                                       (value) => value !== location.id
//                                     )
//                                   );
//                             }}
//                           />
//                         </FormControl>
//                         <FormLabel className="text-base font-normal">
//                           {location.label}
//                         </FormLabel>
//                       </FormItem>
//                     )}
//                   />
//                 ))}
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <Button type="submit">Submit</Button>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default UpdateNDVI;

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const locations = [
  {
    id: "recents",
    label: "Recents",
    children: [],
  },
  {
    id: "home",
    label: "Home",
    children: [
      { id: "living-room", label: "Living Room" },
      { id: "kitchen", label: "Kitchen" },
    ],
  },
  {
    id: "applications",
    label: "Applications",
    children: [],
  },
  {
    id: "desktop",
    label: "Desktop",
    children: [
      { id: "folder1", label: "Folder 1" },
      { id: "folder2", label: "Folder 2" },
    ],
  },
  {
    id: "downloads",
    label: "Downloads",
    children: [],
  },
  {
    id: "documents",
    label: "Documents",
    children: [
      { id: "work", label: "Work" },
      { id: "personal", label: "Personal" },
    ],
  },
];

const FormSchema = z.object({
  locations: z.array(z.string()).refine((value) => value.length > 0, {
    message: "You have to select at least one location.",
  }),
});

const UpdateNDVI = () => {
  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (id) => {
    setOpenDropdowns((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleParentChange = (field, parentId, childIds, checked) => {
    let updatedValues = [...field.value];

    if (checked) {
      updatedValues = [...new Set([...updatedValues, parentId, ...childIds])];
    } else {
      updatedValues = updatedValues.filter(
        (id) => id !== parentId && !childIds.includes(id)
      );
    }

    field.onChange(updatedValues);
  };

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      locations: ["recents", "home"],
    },
  });

  function onSubmit(data) {
    console.log("in submit", data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="w-full h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="locations"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-4xl font-bold">
                    NDVI Locations
                  </FormLabel>
                  <FormDescription className="my-4 text-base text-foreground">
                    Select the places for which you want to update the NDVI.
                  </FormDescription>
                </div>
                {locations.map((location) => (
                  <FormField
                    key={location.id}
                    control={form.control}
                    name="locations"
                    render={({ field }) => {
                      const childIds = location.children.map(
                        (child) => child.id
                      );
                      const allChildrenSelected = childIds.every((id) =>
                        field.value.includes(id)
                      );
                      const isParentChecked =
                        field.value.includes(location.id) ||
                        allChildrenSelected;

                      return (
                        <div>
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={isParentChecked}
                                onCheckedChange={(checked) =>
                                  handleParentChange(
                                    field,
                                    location.id,
                                    childIds,
                                    checked
                                  )
                                }
                              />
                            </FormControl>
                            <FormLabel className="text-base font-normal">
                              {location.label}
                            </FormLabel>
                            {location.children.length > 0 && (
                              <button
                                type="button"
                                onClick={() => toggleDropdown(location.id)}
                                className="focus:outline-none"
                              >
                                {openDropdowns[location.id] ? (
                                  <ChevronDown size={20} />
                                ) : (
                                  <ChevronUp size={20} />
                                )}
                              </button>
                            )}
                          </FormItem>

                          {/* Render children if the dropdown is open */}
                          {openDropdowns[location.id] &&
                            location.children.length > 0 && (
                              <div className="pl-6 space-y-2">
                                {location.children.map((child) => (
                                  <FormField
                                    key={child.id}
                                    control={form.control}
                                    name="locations"
                                    render={({ field }) => (
                                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value.includes(
                                              child.id
                                            )}
                                            onCheckedChange={(checked) =>
                                              checked
                                                ? field.onChange([
                                                    ...field.value,
                                                    child.id,
                                                  ])
                                                : field.onChange(
                                                    field.value.filter(
                                                      (value) =>
                                                        value !== child.id
                                                    )
                                                  )
                                            }
                                          />
                                        </FormControl>
                                        <FormLabel className="text-sm font-normal">
                                          {child.label}
                                        </FormLabel>
                                      </FormItem>
                                    )}
                                  />
                                ))}
                              </div>
                            )}
                        </div>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
};

export default UpdateNDVI;
