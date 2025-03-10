"use client"

import { useRouter } from "next/navigation"
import { PrimaryButton } from "./button/PrimaryButton"

export const PricingSection = () => {
    const router = useRouter();
    
    const plans = [
        {
            name: "Free",
            price: "$0",
            period: "forever",
            description: "Perfect for individuals just getting started with automation",
            features: [
                "100 tasks per month",
                "Single-step zaps",
                "5 zaps total",
                "Standard support"
            ],
            cta: "Get Started",
            highlighted: false
        },
        {
            name: "Pro",
            price: "$19.99",
            period: "per month",
            description: "Advanced features for power users and growing teams",
            features: [
                "Unlimited tasks",
                "Multi-step zaps",
                "Unlimited zaps",
                "Priority support",
                "Conditional logic",
                "Premium apps"
            ],
            cta: "Start Free Trial",
            highlighted: true
        },
        {
            name: "Business",
            price: "$49.99",
            period: "per month",
            description: "Enterprise-grade features for organizations",
            features: [
                "Everything in Pro",
                "Team collaboration",
                "Custom integrations",
                "Advanced security",
                "Dedicated account manager",
                "API access"
            ],
            cta: "Contact Sales",
            highlighted: false
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                        Choose the plan that fits your needs, with no hidden fees
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div 
                            key={index} 
                            className={`rounded-lg overflow-hidden border ${
                                plan.highlighted 
                                    ? 'border-blue-500 shadow-lg ring-1 ring-blue-500' 
                                    : 'border-gray-200 shadow-sm'
                            }`}
                        >
                            <div className={`p-6 ${plan.highlighted ? 'bg-blue-50' : 'bg-white'}`}>
                                <h3 className="text-xl font-bold">{plan.name}</h3>
                                <div className="mt-4 flex items-baseline">
                                    <span className="text-3xl font-bold">{plan.price}</span>
                                    <span className="ml-1 text-gray-600">/{plan.period}</span>
                                </div>
                                <p className="mt-3 text-gray-600 text-sm">{plan.description}</p>
                            </div>
                            <div className="border-t border-gray-200 bg-white p-6">
                                <ul className="space-y-3">
                                    {plan.features.map((feature, featureIdx) => (
                                        <li key={featureIdx} className="flex items-start">
                                            <svg className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-6">
                                    <PrimaryButton 
                                        onClick={() => {
                                            plan.name === "Free" ? router.push("/signup") : 
                                            plan.name === "Pro" ? router.push("/signup?plan=pro") :
                                            router.push("/contact")
                                        }} 
                                        size="big"
                                    >
                                        {plan.cta}
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-600">
                        All plans include a 14-day trial. No credit card required.
                    </p>
                </div>
            </div>
        </section>
    )
}