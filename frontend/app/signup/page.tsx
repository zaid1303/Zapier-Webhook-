"use client"

import { Appbar } from "@/components/Appbar";
import { PrimaryButton } from "@/components/button/PrimaryButton";
import { CheckFeature } from "@/components/CheckFeature";
import { Input } from "@/components/Input";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BACKEND_URL } from "../config";

export default function SignupPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSignup = async () => {
        if (!name || !email || !password) {
            setError("Please fill in all fields");
            return;
        }

        setIsLoading(true);
        setError("");
        
        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
                username: email,
                password,
                name
            });
            localStorage.setItem("token", res.data.token);
            router.push("/dashboard");
        } catch (err:any) {
            setError(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Appbar />
            <div className="flex-grow flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden md:flex">
                    {/* Left side - Marketing content */}
                    <div className="md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-blue-50 to-indigo-50">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                            Join millions worldwide who automate their work using Zapier.
                        </h1>
                        <div className="space-y-6 mt-8">
                            <CheckFeature label={"Easy setup, no coding required"} />
                            <CheckFeature label={"Free forever for core features"} />
                            <CheckFeature label={"14-day trial of premium features & apps"} />
                        </div>
                    </div>
                    
                    {/* Right side - Form */}
                    <div className="md:w-1/2 p-8 md:p-12">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                            Create your account
                        </h2>
                        
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded">
                                {error}
                            </div>
                        )}
                        
                        <div className="space-y-4">
                            <Input 
                                label={"Name"} 
                                onChange={e => setName(e.target.value)}
                                type="text" 
                                placeholder="Your name"
                            />
                            
                            <Input 
                                label={"Email"} 
                                onChange={e => setEmail(e.target.value)}
                                type="text" 
                                placeholder="Your Email"
                            />
                            
                            <Input 
                                label={"Password"} 
                                onChange={e => setPassword(e.target.value)}
                                type="password" 
                                placeholder="Password"
                            />
                            
                            <div className="pt-4">
                                <PrimaryButton 
                                    onClick={handleSignup} 
                                    size="big"
                                >
                                    {isLoading ? "Creating account..." : "Get started free"}
                                </PrimaryButton>
                            </div>
                            
                            <p className="text-sm text-gray-500 mt-6">
                                Already have an account? <a href="/login" className="text-blue-600 hover:underline">Log in</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            <footer className="py-4 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Your Company. All rights reserved.
            </footer>
        </div>
    );
}