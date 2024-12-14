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
import { toast } from "@/hooks/use-toast";
import { useResetPasswordService } from "@/services/useAuthService";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

interface IResetPassword {
    email: string;
    otp: string;
    newPassword: string;
    confirmPassword: string;
}
const ResetPassword = () => {
    const [input, setInput] = useState<IResetPassword>({
        email: "",
        otp: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const email = localStorage.getItem("email");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: useResetPasswordService,
        onSuccess: (data) => {
            setIsLoading(false);
            localStorage.removeItem("email");
            toast({
                variant: "success",
                title: "Password reset successful",
                description: `${data.message}`,
            });
            navigate("/login");
        },
        onError: (data) => {
            setIsLoading(false);
            toast({
                variant: "destructive",
                title: "Failed to reset password",
                description: `${data.message}`,
            });
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!email) {
            toast({
                variant: "destructive",
                title: "Email not found",
                description: "Please go back to the forget password page",
            });
        }
        if (input.newPassword !== input.confirmPassword) {
            return toast({
                variant: "destructive",
                title: "Password mismatch",
                description: "Please enter the same password in both fields",
            });
        }
        const updatedInput = { ...input, email: email ?? "" };
        setIsLoading(true);
        mutation.mutate(updatedInput);
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="container space-y-3 h-screen flex items-center justify-center w-full">
                    <Card className="max-w-[43rem] shadow-lg backdrop-blur-md">
                        <CardHeader>
                            <CardTitle title="Forget Password">
                                Enter your email to reset your password
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="space-y-2">
                                <Label htmlFor="otp">Otp</Label>
                                <Input
                                    name="otp"
                                    type="text"
                                    value={input.otp}
                                    onChange={handleInputChange}
                                    id="email"
                                    placeholder="Enter your otp"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">
                                    New Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        name="newPassword"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        value={input.newPassword}
                                        onChange={handleInputChange}
                                        id="newPassword"
                                        placeholder="Enter new password"
                                        required
                                    />
                                    {showPassword ? (
                                        <Eye
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2  cursor-pointer"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        />
                                    ) : (
                                        <EyeOff
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">
                                    Confirm Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        name="confirmPassword"
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={input.confirmPassword}
                                        onChange={handleInputChange}
                                        id="confirmPassword"
                                        placeholder="Confirm new password"
                                        required
                                    />
                                    {showConfirmPassword ? (
                                        <Eye
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                        />
                                    ) : (
                                        <EyeOff
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="btn">
                            <div className="w-full flex justify-center">
                                <Button
                                    className={
                                        isLoading
                                            ? "bg-accent-foreground text-muted-foreground"
                                            : ""
                                    }
                                    type="submit"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="h-6 w-6 animate-spin mr-2" />
                                            Resetting Password...
                                        </>
                                    ) : (
                                        "Reset Password"
                                    )}
                                </Button>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </form>
        </div>
    );
};

export default ResetPassword;
