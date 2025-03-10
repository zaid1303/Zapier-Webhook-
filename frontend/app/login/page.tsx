"use client";
import { Appbar } from "@/components/Appbar";
import { CheckFeature } from "@/components/CheckFeature";
import { Input } from "@/components/Input";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { PrimaryButton } from "@/components/button/PrimaryButton";
import { BACKEND_URL } from "../config";

export default function() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    
    const handleLogin = async () => {
        if (!email || !password) {
            setError("Please enter both email and password");
            return;
        }
        
        setLoading(true);
        setError("");
        
        try {
            const res = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
                username: email,
                password
            });
            localStorage.setItem("token", res.data.token);
            router.push("/dashboard");
        } catch (err:any) {
            console.error("Login failed:", err);
            setError(
                err.response?.data?.message || 
                "Login failed. Please check your credentials."
            );
            setLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen flex flex-col bg-gray-50"> 
            <Appbar />
            <div className="flex-grow flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden md:flex">
                    {/* Left section - Value proposition */}
                    <div className="md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-blue-50 to-indigo-50">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                            Join millions worldwide who automate their work using Zapier.
                        </h1>
                        
                        <div className="space-y-6 pt-4">
                            <CheckFeature label={"Easy setup, no coding required"} />
                            <CheckFeature label={"Free forever for core features"} />
                            <CheckFeature label={"14-day trial of premium features & apps"} />
                        </div>
                        
                    </div>
                    
                    {/* Right section - Login form */}
                    <div className="w-full md:w-1/2 pt-6 pb-6 mt-4 md:mt-12 px-4">
                        <div className="bg-white border rounded-lg shadow-sm p-6 md:p-8">
                            <h2 className="text-xl font-semibold mb-6 text-gray-800">Log in to your account</h2>
                            
                            {error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded text-sm">
                                    {error}
                                </div>
                            )}
                            
                            <div className="space-y-4">
                                <Input 
                                    onChange={e => setEmail(e.target.value)}
                                    label={"Email"} 
                                    type="text" 
                                    placeholder="your.email@example.com"
                                />
                                
                                <Input 
                                    onChange={e => setPassword(e.target.value)}
                                    label={"Password"} 
                                    type="password" 
                                    placeholder="Your password"
                                />
                                
                                
                                <PrimaryButton 
                                    onClick={handleLogin} 
                                    size="big" 
                                >
                                    {loading ? "Logging in..." : "Log in"}
                                </PrimaryButton>
                            </div>
                            
                            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                                <p className="text-gray-600 text-sm">
                                    Don't have an account?{" "}
                                    <a 
                                        href="/signup" 
                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                    >
                                        Sign up for free
                                    </a>
                                </p>
                            </div>
                        </div>
                        
                        <div className="mt-6 text-center text-gray-500 text-xs">
                            By logging in, you agree to our{" "}
                            <a href="#" className="underline">Terms of Service</a>{" "}
                            and{" "}
                            <a href="#" className="underline">Privacy Policy</a>.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}