import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const SignUp = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 justify-center items-center p-12">
        <svg className="w-full h-full max-w-lg" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
          <path d="M778.3 460.7c-13.7-72.5-46.9-139.1-96.4-193.5-30.6-33.6-66.9-61.6-107.3-82.8-40.4-21.2-84.5-35.5-130.1-42.1-45.6-6.6-92.1-5.9-137.4 2.1-45.3 8-88.9 23.8-128.7 46.5-39.8 22.7-75.3 52.1-105.2 86.8-29.9 34.7-53.8 74.3-70.7 117.1-16.9 42.8-26.6 88.1-28.7 134.2-2.1 46.1 3.4 92.3 16.3 136.8 12.9 44.5 32.9 86.7 59.2 124.8 26.3 38.1 58.6 71.6 95.8 98.9 37.2 27.3 78.8 48.1 122.9 61.6 44.1 13.5 90.3 19.6 136.5 18 46.2-1.6 91.8-10.8 134.9-27.2 43.1-16.4 83.3-40 118.9-69.3 35.6-29.3 66.2-64.2 90.7-103.2 24.5-39 42.6-81.7 53.5-126.3 10.9-44.6 14.4-90.8 10.4-136.5-4-45.7-15.4-90.4-33.6-132.9zM495.9 763.5c-12.7 0-25.3-1.1-37.7-3.2-12.4-2.1-24.5-5.3-36.2-9.5-11.7-4.2-23-9.4-33.7-15.5-10.7-6.1-20.9-13.2-30.4-21.1-9.5-7.9-18.3-16.7-26.3-26.2-8-9.5-15.2-19.7-21.4-30.5-6.2-10.8-11.4-22.2-15.5-34-4.1-11.8-7.1-24-8.9-36.4-1.8-12.4-2.5-25-2-37.5.5-12.5 2.2-24.9 5-37 2.8-12.1 6.8-23.9 11.8-35.2 5-11.3 11.1-22.1 18.2-32.3 7.1-10.2 15.2-19.7 24.1-28.4 8.9-8.7 18.7-16.6 29.2-23.5 10.5-6.9 21.7-12.8 33.4-17.6 11.7-4.8 23.9-8.5 36.4-11 12.5-2.5 25.2-3.8 38-3.8 12.8 0 25.5 1.3 38 3.8 12.5 2.5 24.7 6.2 36.4 11 11.7 4.8 22.9 10.7 33.4 17.6 10.5 6.9 20.3 14.8 29.2 23.5 8.9 8.7 17 18.2 24.1 28.4 7.1 10.2 13.2 21 18.2 32.3 5 11.3 9 23.1 11.8 35.2 2.8 12.1 4.5 24.5 5 37 .5 12.5-.2 25.1-2 37.5-1.8 12.4-4.8 24.6-8.9 36.4-4.1 11.8-9.3 23.2-15.5 34-6.2 10.8-13.4 21-21.4 30.5-8 9.5-16.8 18.3-26.3 26.2-9.5 7.9-19.7 15-30.4 21.1-10.7 6.1-22 11.3-33.7 15.5-11.7 4.2-23.8 7.4-36.2 9.5-12.4 2.1-25 3.2-37.7 3.2z" fill="#ffffff"/>
          <path d="M495.9 578.5c-25.4 0-49.9-5-73.1-14.8-23.2-9.8-44.2-24-62-41.8-17.8-17.8-32-38.8-41.8-62-9.8-23.2-14.8-47.7-14.8-73.1s5-49.9 14.8-73.1c9.8-23.2 24-44.2 41.8-62 17.8-17.8 38.8-32 62-41.8 23.2-9.8 47.7-14.8 73.1-14.8s49.9 5 73.1 14.8c23.2 9.8 44.2 24 62 41.8 17.8 17.8 32 38.8 41.8 62 9.8 23.2 14.8 47.7 14.8 73.1s-5 49.9-14.8 73.1c-9.8 23.2-24 44.2-41.8 62-17.8 17.8-38.8 32-62 41.8-23.2 9.8-47.7 14.8-73.1 14.8z" fill="#4299e1"/>
        </svg>
      </div>
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>Sign up to get started with our service</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" type="text" placeholder="John Doe" required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" required />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" required />
              </div>
              <Button type="submit" className="w-full">Sign Up</Button>
            </form>
            <div className="mt-6">
              <Separator className="my-4">
                <span className="px-2 text-sm text-gray-500">Or continue with</span>
              </Separator>
              <Button variant="outline" className="w-full">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign in with Google
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <p className="text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <Link to ="/login" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;