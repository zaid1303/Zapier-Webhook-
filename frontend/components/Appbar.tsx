"use client"

import { LinkButton } from "./button/LinkButton"
import { useRouter } from "next/navigation"
import { PrimaryButton } from "./button/PrimaryButton";

export const Appbar = () => {
    const router = useRouter();
    return <div className="flex border-b justify-between p-3">
        <div className="flex flex-col justify-center text-2xl font-extrabold">
            Zapier
        </div>
        <div className="flex">
            <div className="pr-4">
                <LinkButton onClick={() => { }}>Contact Sales</LinkButton>
            </div>
            <div className="pr-4">
                <LinkButton onClick={() => {
                    router.push("/login")
                }}>Login</LinkButton>
            </div>
            <PrimaryButton onClick={() => {
                router.push("/signup")
            }}>SignUp</PrimaryButton>
        </div>
    </div>
}