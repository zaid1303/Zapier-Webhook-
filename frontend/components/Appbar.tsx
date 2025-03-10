"use client"

import { LinkButton } from "./button/LinkButton"
import { PrimaryButton } from "./button/PrimaryButton"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { UserCircle } from "lucide-react"

export const Appbar = () => {
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [userName, setUserName] = useState("")

    // Simulate checking auth status - replace with your actual auth logic
    useEffect(() => {
        const checkAuth = () => {
            // Replace with your actual auth check
            const token = localStorage.getItem("token")
            setIsLoggedIn(!!token)
            setUserName(localStorage.getItem("userName") || "")
        }
        checkAuth()
    }, [])

    const handleLogout = () => {
        // Replace with your actual logout logic
        localStorage.removeItem("token")
        localStorage.removeItem("userName")
        setIsLoggedIn(false)
        setShowDropdown(false)
        router.push("/")
    }

    return (
        <div className="flex border-b justify-between p-3 bg-white shadow-sm">
            <div className="flex items-center">
                <div 
                    className="text-2xl font-extrabold cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={() => router.push("/")}
                >
                    Zapier
                </div>
                
                
            </div>

            <div className="flex items-center">
                {!isLoggedIn ? (
                    <>
                        <div className="pr-4">
                            <LinkButton onClick={() => router.push("/contact")}>
                                Contact Sales
                            </LinkButton>
                        </div>
                        <div className="pr-4">
                            <LinkButton onClick={() => router.push("/login")}>
                                Login
                            </LinkButton>
                        </div>
                        <PrimaryButton onClick={() => router.push("/signup")}>
                            Sign Up
                        </PrimaryButton>
                    </>
                ) : (
                    <div className="relative">
                        <div 
                            className="flex items-center gap-2 cursor-pointer p-2 rounded-full hover:bg-gray-100"
                            onClick={() => setShowDropdown(!showDropdown)}
                        >
                            <UserCircle className="h-6 w-6" />
                            <span className="font-medium">{userName}</span>
                        </div>
                        
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border">
                                {/* <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={() => router.push("/profile")}
                                >
                                    Profile
                                </button>
                                <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                    onClick={() => router.push("/settings")}
                                >
                                    Settings
                                </button>
                                <hr className="my-1" /> */}
                                <button
                                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}