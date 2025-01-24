import React from "react";
import {useState} from "react";
import {motion} from "framer-motion";
import {Eye, EyeOff, Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {useAuth} from "@/hooks/useAuth";
import {useToast} from "@/hooks/use-toast";
import {Link, useNavigate} from "react-router-dom";

export default function SignUp() {
    const {toast} = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const {signUpMutation} = useAuth();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const signUpData = {
        firstName,
        lastName,
        userName,
        email,
        password,
    };
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
    const validatePassword = (password: string) => {
        const errors: string[] = [];

        // Length check
        if (password.length < 8 || password.length > 16) {
            errors.push("Password must be 8-16 characters long");
        }

        // Special character check
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push("Must include at least one special character");
        }

        // Uppercase check
        if (!/[A-Z]/.test(password)) {
            errors.push("Must include at least one capital letter");
        }

        // Numeric check
        if (!/[0-9]/.test(password)) {
            errors.push("Must include at least one numeric digit");
        }

        return errors;
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        // Validate password as user types
        const validationErrors = validatePassword(newPassword);
        setPasswordErrors(validationErrors);
    };

    const handleSignUp = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPasswordErrors([]);

        // Validate password
        const passwordValidationErrors = validatePassword(password);

        // If there are validation errors, show them one by one
        if (passwordValidationErrors.length > 0) {
            // Show first error
            toast({
                title: "Password Validation Error",
                description: passwordValidationErrors[0],
                variant: "destructive",
            });
            return;
        }
        setIsLoading(true);
        signUpMutation.mutate(signUpData, {
            onSuccess: () => {
                localStorage.setItem("email", email);
                setIsLoading(false);
                toast({
                    title: "Sign up successful!",
                    description:
                        "Please verify your email to complete the sign up process.",
                    variant: "success",
                });
                navigate("/verify-email");
            },
            onError: (data) => {
                setIsLoading(false);
                toast({
                    title: "Sign up failed!",
                    description: data.message,
                    variant: "destructive",
                });
            },
        });
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute left-1/3 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                <div className="absolute right-1/3 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-1/3 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>
            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.5}}
                className="w-full max-w-2xl px-4 sm:px-0"
            >
                <Card className="bg-gray-800/40 backdrop-blur-md border-gray-700">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-3xl font-bold text-center text-white">
                            Sign Up
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSignUp} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="firstName"
                                        className="text-white"
                                    >
                                        First Name
                                    </Label>
                                    <Input
                                        id="firstName"
                                        value={firstName}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                        placeholder="Enter your first name"
                                        required
                                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="lastName"
                                        className="text-white"
                                    >
                                        Last Name
                                    </Label>
                                    <Input
                                        id="lastName"
                                        value={lastName}
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                        placeholder="Enter your last name"
                                        required
                                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label
                                    htmlFor="username"
                                    className="text-white"
                                >
                                    Username
                                </Label>
                                <Input
                                    id="username"
                                    value={userName}
                                    onChange={(e) =>
                                        setUserName(e.target.value)
                                    }
                                    placeholder="Choose a username"
                                    required
                                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-white">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    type="email"
                                    required
                                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                                />
                            </div>
                            <div className="space-y-2 relative">
                                <Label
                                    htmlFor="password"
                                    className="text-white"
                                >
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="Create a password"
                                    type={
                                        isPasswordVisible ? "text" : "password"
                                    }
                                    required
                                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                                />
                                {passwordErrors.length > 0 && (
                                    <div className="text-red-500 text-sm">
                                        {passwordErrors[0]}
                                    </div>
                                )}

                                {isPasswordVisible ? (
                                    <Eye
                                        onClick={() =>
                                            setIsPasswordVisible(false)
                                        }
                                        className="absolute right-3 top-8"
                                    />
                                ) : (
                                    <EyeOff
                                        onClick={() =>
                                            setIsPasswordVisible(true)
                                        }
                                        className="absolute right-3 top-8"
                                    />
                                )}
                            </div>
                            <Button
                                className="w-full"
                                variant={"auth"}
                                type="submit"
                                // className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg py-6"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Signing Up...
                                    </>
                                ) : (
                                    "Sign Up"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <p className="text-sm text-gray-400 text-center w-full">
                            Already have an account?{" "}
                            <Link
                                className="text-purple-400 hover:text-purple-300 underline underline-offset-4"
                                to="/login"
                            >
                                Sign In
                            </Link>
                        </p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
}
