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
            <form onSubmit={handleSubmit}>
                <div className="container space-y-3 h-screen flex items-center justify-center w-full">
                    <Card className="max-w-[43rem] md:w-">
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
                                    onChange={(e) => setEmail(e.target.value)}
                                    id="email"
                                    className="input"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="w-full flex justify-center">
                            <Button type="submit">
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-6 w-6 animate-spin" />
                                        ...Sending
                                    </>
                                ) : (
                                    " Send Email"
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </form>
        </>
    );
};

export default ForgetPassword;
