import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
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
import { useAuth } from "@/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/context/authcontext";
import { toast } from "@/hooks/use-toast";

const Login = () => {
    const { login } = useAuthContext();
    const navigate = useNavigate();
    const { loginMutation } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSignIn = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        const isEmail = /\S+@\S+\.\S+/.test(input);
        const loginDetails = isEmail
            ? { email: input, password }
            : { userName: input, password };

        loginMutation.mutate(loginDetails, {
            onSuccess: (data) => {
                setIsLoading(false);
                login(data?.data?.accessToken, data?.data?.refreshToken);
                toast({
                    variant: "default",
                    title: `${data?.message}`,
                });
                navigate("/");
            },
            onError: (data) => {
                setIsLoading(false);
                toast({
                    variant: "destructive",
                    title: "Sign in failed!",
                    description: `${data?.message}`,
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-2xl px-4 sm:px-0"
            >
                <Card className="bg-gray-800/40 backdrop-blur-md border-gray-700">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-3xl font-bold text-center text-white">
                            Sign In
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSignIn} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="input" className="text-white">
                                    Username or Email
                                </Label>
                                <Input
                                    id="input"
                                    placeholder="Enter your username or email"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    required
                                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label
                                    htmlFor="password"
                                    className="text-white"
                                >
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Enter your password"
                                    type="password"
                                    required
                                    className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400"
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg py-6"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Signing In...
                                    </>
                                ) : (
                                    "Sign In"
                                )}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <p className="text-sm text-gray-400 text-center w-full">
                            Don't have an account?{" "}
                            <a
                                href="#"
                                className="text-purple-400 hover:text-purple-300 underline underline-offset-4"
                            >
                                <Link to="/sign-up">Sign Up</Link>
                            </a>
                        </p>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    );
};
export default Login;
