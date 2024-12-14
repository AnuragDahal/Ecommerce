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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
    const [loading, setisLoading] = useState(false);
    const { toast } = useToast();
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const [cooldown, setCooldown] = useState(0);
    const [attemptedVerify, setHasAttemptedVerify] = useState(false);

    const emailData = {
        otp: otp,
        email: localStorage.getItem("email") as string,
    };
    const mutation = useMutation({
        mutationFn: useOtpVerificationService,
        onSuccess: (data) => {
            setisLoading(!loading);
            toast({
                title: "Verification successful!",
                description: data.message,
                variant: "success",
            });
            navigate("/login");
        },
        onError: (data) => {
            setisLoading(!loading);
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
    useEffect(() => {
        if (cooldown > 0) {
            const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [cooldown]);

    const handleVerify = () => {
        setHasAttemptedVerify(!attemptedVerify);
        setisLoading(!loading);
        mutation.mutate(emailData);
    };
    const handleResend = () => {
        setCooldown(60);
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
                    <CardFooter className="flex flex-col items-center gap-3">
                        <Button
                            className="w-full mt-4"
                            onClick={handleVerify}
                            disabled={otp.length !== 6}
                        >
                            {loading ? "Verifying..." : "Verify"}
                        </Button>
                        <Button
                            className="w-full space-y-2"
                            disabled={cooldown > 0 || !attemptedVerify}
                            onClick={handleResend}
                        >
                            Resend Verification Email{" "}
                            {cooldown > 0 && `(${cooldown})`}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default EmailVerification;
