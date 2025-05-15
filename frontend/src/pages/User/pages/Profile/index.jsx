import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Mail,
  PenOff,
  Pen,
  LockKeyhole,
  Trash2,
  Calendar,
  X,
} from "lucide-react";
import "./datePicker.css"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useIsMobile } from "@/hooks/use-mobile";
import DatePicker from "react-date-picker";
import { useAuth } from "@/providers/AuthProvider";
import { useUserProfile } from "../../index";
import { editUserDetails } from "@/api/userProfileEndpoints";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const userProfileSchema = z.object({
  username: z.string().min(1, "Username is required"),
  organization: z.string(),
  email: z.string().email(),
  address: z.string(),
  phone: z.string(),
  avatar: z.any(),
  dateOfBirth: z.any()
});

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const isMobile = useIsMobile();
  const { userDetails } = useAuth();
  const { userProfile, setUserProfile } = useUserProfile();
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const form = useForm({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      username: userDetails.username,
      organization: "",
      email: userDetails.email,
      address: "",
      phone: "",
      avatar: "",
      dateOfBirth: null
    }
  });

  // Initialize form with user data
  useEffect(() => {
    if (userProfile) {
      form.reset({
        username: userProfile.username,
        organization: userProfile.organization || "",
        email: userProfile.email,
        address: userProfile.address || "",
        phone: userProfile.phone || "",
        avatar: userProfile.avatar || "",
        dateOfBirth: null
      });
    }
  }, [userProfile, form]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      form.setValue("avatar", file);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", data.username);
      formData.append("email", data.email);
      formData.append("organization", data.organization);
      formData.append("address", data.address);
      formData.append("phone", data.phone);
      
      if (data.avatar instanceof File) {
        formData.append("avatar", data.avatar);
      }
      console.log(data)

      // const response = await editUserDetails(formData);
      
      // if (response.code === 200) {
      //   setUserProfile(response.data);
      //   setIsEditing(false);
      // }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    form.reset({
      username: userProfile.username,
      organization: userProfile.organization || "",
      email: userProfile.email,
      address: userProfile.address || "",
      phone: userProfile.phone || "",
      avatar: userProfile.avatar || "",
      dateOfBirth: null
    });
    setIsEditing(false);
  };

  const handleChangePassword = () => {
    // Handle password change logic here
    setShowPasswordDialog(false);
  };

  const handleDeleteAccount = () => {
    // Handle account deletion logic here
    setShowDeleteDialog(false);
  };

  return (
    <div className="h-full py-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-2xl md:text-3xl">Profile</h2>
          <div className="flex gap-2 justify-end">
            {isEditing && (
              <Button 
                onClick={form.handleSubmit(onSubmit)}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            )}
            <Button
              variant={isEditing ? "outline" : "default"}
              onClick={isEditing ? handleCancel : () => setIsEditing(true)}
              disabled={isLoading}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </div>
      </div>
      <div className="pt-6 flex flex-col md:flex-row gap-6">
        <div className="h-fit w-fit space-y-6">
          <div className="relative w-48">
            <Avatar className="h-48 w-48">
              <AvatarImage src={form.watch("avatar") instanceof File ? URL.createObjectURL(form.watch("avatar")) : form.watch("avatar")} />
              <AvatarFallback className="text-5xl">
                {form.watch("username")?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <Input
              type="file"
              accept="image/*"
              className="hidden"
              id="avatar-upload"
              onChange={handleImageUpload}
              disabled={!isEditing}
            />
            <Label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-[14%] bg-primary text-primary-foreground rounded-full p-1 cursor-pointer hover:bg-primaryDark"
            >
              {isEditing ? (
                <Pen className="h-6 w-6" />
              ) : (
                <PenOff className="h-6 w-6" />
              )}
            </Label>
          </div>
          <div className="flex-1 md:pl-3">
            <p className="text-2xl">{form.watch("username")}</p>
            <p className="text-base">{form.watch("email")}</p>
          </div>
          {isMobile ? (
            <></>
          ) : (
            <>
              <div 
                className="flex-1 flex gap-4 items-center p-3 rounded-md hover:bg-background cursor-pointer"
                onClick={() => setShowPasswordDialog(true)}
              >
                <LockKeyhole className="w-4 h-4" />
                <p className="text-base">Change Password</p>
              </div>
              <div 
                className="text-red-700 flex-1 flex gap-4 items-center p-3 rounded-md hover:bg-background cursor-pointer"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="w-4 h-4" />
                <p className="text-base">Delete Account</p>
              </div>
            </>
          )}
        </div>
        <Card className="flex-1 bg-white border-none md:border-solid md:border-slate-300">
          <CardHeader className="px-0 md:px-6 text-primary">
            Personal Information
          </CardHeader>
          <CardContent className="p-0 md:p-6 md:pt-0">
            <ScrollArea className="h-fit md:h-[calc(100vh-279px)] md:-ml-1 md:-mr-4 ">
              <div className="space-y-6 md:pr-4 md:pl-1">
                <div className="flex gap-4 flex-col">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      {...form.register("username")}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        id="email"
                        {...form.register("email")}
                        disabled
                        icon={<Mail className="h-4 w-4" />}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        id="address"
                        {...form.register("address")}
                        placeholder="ABC Street"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        id="phone"
                        {...form.register("phone")}
                        disabled={!isEditing}
                        placeholder="Enter phone number"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization</Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        id="organization"
                        {...form.register("organization")}
                        disabled={!isEditing}
                        placeholder="Enter organization name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    <DatePicker 
                      onChange={(date) => form.setValue("dateOfBirth", date)} 
                      value={form.watch("dateOfBirth")} 
                      disabled={!isEditing} 
                      calendarIcon={<Calendar />} 
                      clearIcon={<X />}
                    />
                  </div>
                </div>
              </div>
              {isMobile ? <ScrollBar orientation="vertical" className="hidden invisible"></ScrollBar> : <></>}
            </ScrollArea>
          </CardContent>
        </Card>
        {isMobile ? (
          <>
            <div 
              className="flex-1 flex gap-4 items-center p-3 rounded-md hover:bg-background cursor-pointer"
              onClick={() => setShowPasswordDialog(true)}
            >
              <LockKeyhole className="w-4 h-4" />
              <p className="text-base">Change Password</p>
            </div>
            <div 
              className="text-red-700 flex-1 flex gap-4 items-center p-3 rounded-md hover:bg-background cursor-pointer"
              onClick={() => setShowDeleteDialog(true)}
            >
              <Trash2 className="w-4 h-4" />
              <p className="text-base">Delete Account</p>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>

      {/* Change Password Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and new password below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input type="password" id="current-password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input type="password" id="new-password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input type="password" id="confirm-password" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPasswordDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleChangePassword}>
              Change Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfile;
