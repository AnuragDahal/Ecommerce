import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { userChangePasswordService } from "@/services/useAuthService";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

interface ChangePasswordProps {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const ChangePassword = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState<ChangePasswordProps>({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const mutation = useMutation({
        mutationFn: userChangePasswordService,
        onSuccess: (data) => {
            setIsLoading(false);
            toast({
                title: "Password changed successfully",
                description: data.message,
                variant: "success",
            });
        },
        onError: (data) => {
            setIsLoading(false);
            console.log(input);
            toast({
                title: "Password change failed!",
                description: data.message,
                variant: "destructive",
            });
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (input.newPassword !== input.confirmPassword) {
            toast({
                title: "Password mismatch",
                description: "New password and confirm password must match",
                variant: "destructive",
            });
            return;
        }
        setIsLoading(true);
        const { confirmPassword, ...passwordData } = input;
        console.log(input); 
        mutation.mutate(passwordData);
    };

    return (
        <div className="flex justify-center py-5">
            <Card className="min-w-[20rem] border-muted-foreground shadow-lg backdrop-blur-lg">
                <CardHeader>
                    <CardTitle className="text-center">
                        Change Password
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="oldPassword">
                                Current Password
                            </Label>
                            <Input
                                id="oldPassword"
                                type="password"
                                name="oldPassword"
                                value={input.oldPassword}
                                onChange={handleInputChange}
                                placeholder="Enter your current password"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                                id="newPassword"
                                name="newPassword"
                                value={input.newPassword}
                                onChange={handleInputChange}
                                type="password"
                                placeholder="Enter your new password"
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="confirmPassword">
                                Confirm Password
                            </Label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                value={input.confirmPassword}
                                onChange={handleInputChange}
                                type="password"
                                placeholder="Type your new password again"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full py-2 rounded-md"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-6 w-6 animate-spin inline-block mr-2" />
                                    Changing Password...
                                </>
                            ) : (
                                "Change Password"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default ChangePassword;
