"use client"

import { useRouter } from "next/navigation"
import { PrimaryButton } from "./button/PrimaryButton"
import { SecondaryButton } from "./button/SecondaryButton"
import { Feature } from "./Feature"

export const Hero = () => {
    const router=useRouter();
    return <div>
        <div className="flex justify-center">
            <div className="text-5xl font-semibold text-center pt-8 max-w-xl">
                Automate as fast as you can type
            </div>
        </div>
        <div className="flex justify-center pt-2">
            <div className="text-xl font-normal text-center pt-8 max-w-2xl">
                Turn chaos into smooth operations by automating workflows yourself—no developers, no IT tickets, no delays. The only limit is your imagination.
            </div>
        </div>
        <div className="flex justify-center pt-4">
            <div className="flex">
                <PrimaryButton onClick={() => {router.push("/signup")}} size="big"> Get Started Free</PrimaryButton>
                <div className="pl-4">
                    <SecondaryButton onClick={() => { }} size="big">Contact Sales</SecondaryButton>
                </div>
            </div>
        </div>
        <div className="flex justify-center">
            <Feature title={"Free Forever "} subtitle={" for core feature"}></Feature>
            <Feature title={"More apps "} subtitle={" than any other platforms"}></Feature>
            <Feature title={"Cutting Edge "} subtitle={" AI Features"}></Feature>
        </div>
    </div>
}