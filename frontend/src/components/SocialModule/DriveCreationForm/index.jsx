import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "@/hooks/use-toast";
import { createDrive } from "@/api/SocialDataEndpoints"; 

const phoneRegex = /^03[0-9]{9}$/;

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  location: z.string().min(1, "Location is required"),
  dateTime: z.string().min(1, "Date and Time are required"),
  description: z.string().min(10, "Description should be at least 10 characters long"),
  capacity: z.preprocess(
    (val) => Number(val),
    z.number().min(3, "Max Participants should be at least 3")
  ),
  organizerName: z.string().min(1, "Organizer Name is required"),
  contact: z
    .string()
    .regex(phoneRegex, "Enter a valid Pakistani number (e.g., 03XXXXXXXXX)"),
});

  

const DriveCreationForm = ({ onSuccess, className, ...props }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      location: "",
      dateTime: "",
      description: "",
      capacity: 1,
      organizerName: "",
      contact: "", 
    },
  });


  const onSubmit = async (data) => {
    try {
    const newData = {
      ...data,
      dateTime: new Date(data.dateTime).toISOString(),
      status: "pending",
      participants: 1,
      createdAt: new Date().toISOString(),
    };


    // Send the modified data to the backend
    const response = await createDrive(newData);
  
      if (response.code === 201 || response.code === 200) {
        toast({
          variant: "success",
          title: "Success",
          description: `Drive "${data.title}" created successfully`,
        });
        form.reset();
        if (onSuccess) onSuccess();
      } else {
        toast({
          variant: "destructive",
          title: "Error",
        description: response.data?.message || "Error submitting post",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create drive",
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent>
          <h1 className="text-3xl my-5 font-bold text-center">Create Plantation Drive</h1>
          <form
            className="flex flex-col gap-6"
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
          >
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Drive Title"
                {...form.register("title")}
              />
              {form.formState.errors.title && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.title.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                type="text"
                placeholder="Drive Location"
                {...form.register("location")}
              />
              {form.formState.errors.location && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.location.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="dateTime">Date & Time</Label>
              <Input
                id="dateTime"
                type="datetime-local"
                {...form.register("dateTime")}
              />
              {form.formState.errors.dateTime && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.dateTime.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                placeholder="Describe the drive"
                {...form.register("description")}
              />
              {form.formState.errors.description && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
             <Label htmlFor="capacity">Max Participants</Label>
              <Input
                id="capacity"
                type="number"
                placeholder="Max number of participants"
                {...form.register("capacity")}
              />
              {form.formState.errors.capacity && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.capacity.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="organizerName">Organizer Name</Label>
              <Input
                id="organizerName"
                type="text"
                placeholder="Organizer Name"
                {...form.register("organizerName")}
              />
              {form.formState.errors.organizerName && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.organizerName.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
            <Label htmlFor="contact">Contact Number</Label>
            <Input
              id="contact"
              type="tel"
              placeholder="03XXXXXXXXX"
              {...form.register("contact")}
            />
            {form.formState.errors.contact && (
              <p className="text-sm text-destructive">
                {form.formState.errors.contact.message}
              </p>
            )}
          </div>


            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Creating..." : "Create Drive"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DriveCreationForm;
