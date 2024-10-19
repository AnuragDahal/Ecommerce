"use client";

import { useState } from "react";
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
import { Mail, MapPin, Phone } from "lucide-react";

interface ProfileData {
    name: string;
    email: string;
    phone: string;
    location: string;
}

export default function ProfileCard() {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState<ProfileData>({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsEditing(false);
        // Here you would typically send the updated profile to your backend
        console.log("Updated profile:", profile);
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24">
                    <AvatarImage
                        src="/placeholder.svg?height=96&width=96"
                        alt="Profile picture"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <CardTitle className="text-2xl font-bold">
                    {isEditing ? (
                        <Input
                            name="name"
                            value={profile.name}
                            className="text-center text-2xl font-bold"
                            readOnly
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
                        <Button
                            variant="outline"
                            onClick={() => (
                                setIsEditing(false),
                                setProfile({
                                    name: "John Doe",
                                    email: "johndoe@example.com",
                                    phone: "+1 (555) 123-4567",
                                    location: "San Francisco, CA",
                                })
                            )}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" onClick={handleSubmit}>
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
