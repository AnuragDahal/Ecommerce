import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { useOtpVerificationService } from "@/services/useAuthService";
import { ToastClose } from "@/components/ui/toast";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
    const { toast } = useToast();
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();

    const emailData = {
        otp: otp,
        email: "abcd123@gmail.com",
    };
    const mutation = useMutation({
        mutationFn: useOtpVerificationService,
        onSuccess: () => {
            toast({
                title: "Verification successful!",
                description: "You have successfully verified your email.",
                variant: "success",
            });
            navigate("/auth/login");
        },
        onError: (data) => {
            toast({
                title: "Verification failed!",
                description: data.message,
                variant: "destructive",
                action: (
                    <ToastClose>
                        <Button>Close</Button>
                    </ToastClose>
                ),
            });
        },
    });

    const handleVerify = () => {
        console.log(emailData);
        mutation.mutate(emailData);
    };

    return (
        <div className="h-screen w-full flex items-center justify-center bg-black/80">
            <div>
                <Card className="max-w-[18rem] h-[400px] px-3 py-4 border-6 rounded-3x shadow-xl backdrop-blur-md">
                    <CardHeader>
                        <CardTitle className="py-3 text-center">
                            Email Verification
                        </CardTitle>
                    </CardHeader>
                    <CardDescription className="text-md pt-6 text-center pb-3">
                        Please enter your six digit otp send to your email
                    </CardDescription>
                    <CardContent className="flex justify-center items-center pt-4">
                        <InputOTP
                            maxLength={6}
                            value={otp}
                            onChange={(value) => setOtp(value)}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full mt-4"
                            onClick={handleVerify}
                            disabled={otp.length !== 6}
                        >
                            Verify
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default EmailVerification;
