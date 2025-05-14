import { useState } from "react";
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

const UserProfile = () => {
  const [date, setDate] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const isMobile = useIsMobile();

  // Placeholder user data - replace with real data
  const [userData, setUserData] = useState({
    name: "John Doe",
    organization: "",
    email: "jd@gmail.com",
    address: "",
    phone: "",
    avatar: "",
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle image upload logic here
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev) => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="h-full py-6">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-2xl md:text-3xl">Profile</h2>
          <div className="flex gap-2 justify-end">
            {isEditing && <Button>Save Changes</Button>}
            <Button
              variant={isEditing ? "outline" : "default"}
              onClick={() => setIsEditing(!isEditing)}
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
              <AvatarImage src={userData.avatar} />
              <AvatarFallback className="text-5xl">
                {userData.name.charAt(0)}
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
            <p className="text-2xl">{userData.name}</p>
            <p className="text-base">{userData.email}</p>
          </div>
          {isMobile ? (
            <></>
          ) : (
            <>
              <div className="flex-1 flex gap-4 items-center p-3 rounded-md hover:bg-background cursor-pointer">
                <LockKeyhole className="w-4 h-4" />
                <p className="text-base">Change Password</p>
              </div>
              <div className="text-red-700 flex-1 flex gap-4 items-center p-3 rounded-md hover:bg-background cursor-pointer">
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
                      value={userData.name}
                      disabled={!isEditing}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        id="email"
                        value={userData.email}
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
                        value={userData.address}
                        placeholder="ABC Street"
                        disabled={!isEditing}
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            address: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        id="phone"
                        value={userData.phone}
                        disabled={!isEditing}
                        placeholder="Enter phone number"
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization</Label>
                    <div className="flex gap-2 items-center">
                      <Input
                        id="organization"
                        value={userData.organization}
                        disabled={!isEditing}
                        placeholder="Enter organization name"
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            organization: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Date of Birth</Label>
                    <DatePicker onChange={setDate} value={date} disabled={!isEditing} calendarIcon={<Calendar />} clearIcon={<X />}/>
                  </div>
                </div>
              </div>
              {isMobile ? <ScrollBar orientation="vertical" className="hidden invisible"></ScrollBar> : <></>}
            </ScrollArea>
          </CardContent>
        </Card>
        {isMobile ? (
          <>
            <div className="flex-1 flex gap-4 items-center p-3 rounded-md hover:bg-background cursor-pointer">
              <LockKeyhole className="w-4 h-4" />
              <p className="text-base">Change Password</p>
            </div>
            <div className="text-red-700 flex-1 flex gap-4 items-center p-3 rounded-md hover:bg-background cursor-pointer">
              <Trash2 className="w-4 h-4" />
              <p className="text-base">Delete Account</p>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
