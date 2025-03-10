"use client"

import { useRouter } from "next/navigation"
import { PrimaryButton } from "./button/PrimaryButton"
import { SecondaryButton } from "./button/SecondaryButton"
import { Feature } from "./Feature"

export const Hero = () => {
    const router = useRouter();
    return (
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-center">
            <div className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center pt-8 max-w-xl leading-tight">
                Automate as fast as you can type
            </div>
        </div>
        <div className="flex justify-center pt-2">
            <div className="text-base sm:text-lg md:text-xl font-normal text-center pt-4 md:pt-8 max-w-2xl text-gray-700">
                Turn chaos into smooth operations by automating workflows yourself—no developers, no IT tickets, no delays. The only limit is your imagination.
            </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center pt-6 md:pt-8 space-y-4 sm:space-y-0 sm:space-x-4">
            <PrimaryButton onClick={() => {router.push("/signup")}} size="big">Get Started Free</PrimaryButton>
            <SecondaryButton onClick={() => {}} size="big">Contact Sales</SecondaryButton>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 md:mt-16 px-4">
            <Feature 
                title={"Free Forever"} 
                subtitle={"for core features"} 
                icon="✨"
            />
            <Feature 
                title={"More apps"} 
                subtitle={"than any other platform"} 
                icon="🚀"
            />
            <Feature 
                title={"Cutting Edge"} 
                subtitle={"AI Features"} 
                icon="🤖"
            />
        </div>
      </div>
    )
}