"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone, Camera } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    getUserProfile,
    handleUserProfileUpdate,
} from "@/services/useUserServices";
import { toast } from "@/hooks/use-toast";

interface ProfileData {
    name: string;
    email: string;
    phone: string;
    location: string;
    avatarSrc: string;
}

export default function ProfileCard() {
    const [loading, setIsLoading] = useState(false);
    const [profilePic, setProfilePic] = useState<File>();
    const [isEditing, setIsEditing] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);
    const [profile, setProfile] = useState<ProfileData>({
        name: "",
        email: "",
        phone: "",
        location: "",
        avatarSrc: "",
    });
    const [originalProfile, setOriginalProfile] =
        useState<ProfileData>(profile);

    const { data } = useQuery({
        queryFn: getUserProfile,
        queryKey: ["userProfile"],
    });

    useEffect(() => {
        if (data) {
            const newProfile = {
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                phone: data.phoneNumber,
                location: data.address,
                avatarSrc: data.avatar,
            };
            setProfile(newProfile);
            setOriginalProfile(newProfile);
        }
    }, [data]);

    const checkForChanges = (updatedProfile: ProfileData) => {
        return (
            updatedProfile.name !== originalProfile.name ||
            updatedProfile.phone !== originalProfile.phone ||
            updatedProfile.location !== originalProfile.location ||
            profilePic !== undefined
        );
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedProfile = { ...profile, [name]: value };
        setProfile(updatedProfile);
        setHasChanges(checkForChanges(updatedProfile));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const tempImgUrl = URL.createObjectURL(file);
            setProfile((prev) => ({ ...prev, avatarSrc: tempImgUrl }));
            setHasChanges(true);
        }
    };

    const { mutate } = useMutation({
        mutationFn: handleUserProfileUpdate,
        onSuccess: (data) => {
            setIsLoading(false);
            setHasChanges(false);
            toast({
                title: "Profile Updated",
                description: data?.message,
                variant: "success",
            });
        },
        onError: (data) => {
            setIsLoading(false);
            toast({
                title: "Profile Update Failed",
                description: data?.message,
                variant: "destructive",
            });
        },
    });

    const profileData = {
        firstName: profile.name.split(" ")[0],
        lastName: profile.name.split(" ")[1],
        address: profile.location,
        phoneNumber: profile.phone,
        image: profilePic,
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsEditing(false);
        mutate(profileData);
        setOriginalProfile(profile);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setProfile(originalProfile);
        setHasChanges(false);
        setProfilePic(undefined);
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="flex flex-col items-center space-y-4">
                <div className="relative w-24 h-24">
                    <Avatar className="w-full h-full">
                        <AvatarImage
                            src={profile.avatarSrc}
                            alt="Profile picture"
                        />
                        {profile.avatarSrc === "" && (
                            <AvatarFallback>
                                {profile.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </AvatarFallback>
                        )}
                    </Avatar>
                    <Label
                        htmlFor="file-upload"
                        className="absolute bottom-0 right-0 rounded-full p-1 cursor-pointer shadow"
                    >
                        <Camera
                            size={18}
                            className={`${isEditing ? "" : "hidden"}`}
                        />
                    </Label>
                    <Input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                            handleImageUpload(e);
                            setProfilePic(e.target.files?.[0]);
                        }}
                    />
                </div>
                <CardTitle className="text-2xl font-bold">
                    {isEditing ? (
                        <Input
                            name="name"
                            value={profile.name}
                            className="text-center text-2xl font-bold"
                            onChange={handleInputChange}
                        />
                    ) : (
                        profile.name
                    )}
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                {isEditing ? (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                name="phone"
                                value={profile.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                                id="location"
                                name="location"
                                value={profile.location}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>
                ) : (
                    <>
                        <div className="flex items-center space-x-2">
                            <Mail className="w-5 h-5 text-muted-foreground" />
                            <Label className="text-sm font-medium">
                                {profile.email}
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Phone className="w-5 h-5 text-muted-foreground" />
                            <Label className="text-sm font-medium">
                                {profile.phone}
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <MapPin className="w-5 h-5 text-muted-foreground" />
                            <Label className="text-sm font-medium">
                                {profile.location}
                            </Label>
                        </div>
                    </>
                )}
            </CardContent>
            <CardFooter className="flex justify-end">
                {isEditing ? (
                    <div className="space-x-2">
                        <Button variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={!hasChanges}
                        >
                            Save
                        </Button>
                    </div>
                ) : (
                    <Button onClick={() => setIsEditing(true)}>
                        Edit Profile
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
