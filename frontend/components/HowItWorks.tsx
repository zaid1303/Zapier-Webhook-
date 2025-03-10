"use client"

import Image from "next/image"

export const HowItWorks = () => {
    const steps = [
        {
            title: "Choose your triggers",
            description: "Select what starts your automation - a new email, a form submission, a scheduled time, and more.",
            icon: "🎯"
        },
        {
            title: "Build your workflow",
            description: "Connect your apps and define what happens next with our easy-to-use visual builder.",
            icon: "🔄"
        },
        {
            title: "Watch it run",
            description: "Sit back as your automation handles tasks for you, 24/7, without any manual intervention.",
            icon: "✅"
        }
    ];

    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
                    <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                        Create powerful automations in minutes with our intuitive platform
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="bg-gray-50 rounded-xl p-8 flex flex-col items-center text-center">
                            <div className="bg-blue-100 text-blue-600 w-16 h-16 flex items-center justify-center rounded-full text-3xl mb-6">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-16 bg-gray-50 rounded-xl p-8 shadow-sm">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div>
                            <h3 className="text-2xl font-bold mb-4">Drag, drop, done.</h3>
                            <p className="text-gray-600 mb-6">
                                Our visual builder makes it easy to create complex workflows without coding. 
                                Connect apps, set conditions, and transform data with just a few clicks.
                            </p>
                            <ul className="space-y-3">
                                {[
                                    "Connect 5,000+ popular apps",
                                    "Use conditional logic for smart workflows",
                                    "Filter and transform data automatically",
                                    "Get real-time notifications when things run"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start">
                                        <span className="text-green-500 mr-2">✓</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            {/* Placeholder for a screenshot of the workflow builder */}
                            <div className="aspect-video bg-gray-200 rounded flex items-center justify-center">
                                <span className="text-gray-500">Workflow Builder Interface</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}