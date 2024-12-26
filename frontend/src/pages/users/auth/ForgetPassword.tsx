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
import { useForgotPasswordService } from "@/services/useAuthService";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
    const [email, setEmail] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: useForgotPasswordService,
        onSuccess: (data) => {
            localStorage.setItem("email", email);
            setIsLoading(false);
            toast({
                variant: "default",
                title: "Email sent",
                description: `${data.message}`,
            });
            navigate("/reset-password");
        },
        onError: (data) => {
            setIsLoading(false);
            toast({
                variant: "destructive",
                title: "Failed to send email",
                description: `${data.message}`,
            });
        },
    });
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        mutate({ email });
    };

    return (
        <>
            <div className="bg-gradient-to-br from-gray-700 via-slate-900 to-gray-500">
                <form onSubmit={handleSubmit}>
                    <div className="space-y-6 h-screen px-16 py-24 w-full flex flex-col justify-center items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-white">
                                Forgot Password
                            </h1>
                        </div>
                        <Card className="bg-gray-800/40 backdrop-blur-md border-gray-700 max-w-3xl text-white w-full p-3">
                            <CardHeader>
                                <CardTitle title="Forget Password">
                                    Enter your email to reset your password
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        name="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        id="email"
                                        className="input"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="w-full flex justify-center">
                                <Button
                                    type="submit"
                                    variant={"auth"}
                                    className="w-full"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="h-6 w-6 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        " Send Email"
                                    )}
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ForgetPassword;
