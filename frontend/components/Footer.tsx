"use client"

import { useRouter } from "next/navigation"

export const Footer = () => {
    const router = useRouter();

    const footerLinks = [
        {
            title: "Product",
            links: [
                { name: "Features", href: "/features" },
                { name: "Integrations", href: "/integrations" },
                { name: "Pricing", href: "/pricing" },
                { name: "Enterprise", href: "/enterprise" },
                { name: "Security", href: "/security" }
            ]
        },
        {
            title: "Resources",
            links: [
                { name: "Blog", href: "/blog" },
                { name: "Help Center", href: "/help" },
                { name: "Community", href: "/community" },
                { name: "Webinars", href: "/webinars" },
                { name: "API Docs", href: "/developers" }
            ]
        },
        {
            title: "Company",
            links: [
                { name: "About Us", href: "/about" },
                { name: "Careers", href: "/careers" },
                { name: "Contact", href: "/contact" },
                { name: "Partners", href: "/partners" },
                { name: "Legal", href: "/legal" }
            ]
        }
    ];

    return (
        <footer className="bg-gray-900 text-white py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
                    <div>
                        <div className="text-2xl font-bold mb-4">AutoFlow</div>
                        <p className="text-gray-400 text-sm mb-4">
                            Turn chaos into smooth operations by automating workflows yourself—no developers, no IT tickets, no delays.
                        </p>
                        <div className="flex space-x-4">
                            {['twitter', 'facebook', 'linkedin', 'github'].map((social) => (
                                <a 
                                    key={social} 
                                    href={`https://${social}.com`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white transition-colors"
                                >
                                    <span className="sr-only">{social}</span>
                                    <div className="w-6 h-6 bg-gray-700 rounded flex items-center justify-center">
                                        {social[0].toUpperCase()}
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {footerLinks.map((column) => (
                        <div key={column.title}>
                            <h3 className="font-semibold text-gray-300 mb-4">{column.title}</h3>
                            <ul className="space-y-2">
                                {column.links.map((link) => (
                                    <li key={link.name}>
                                        <a 
                                            href={link.href}
                                            className="text-gray-400 hover:text-white transition-colors text-sm"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                router.push(link.href);
                                            }}
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} AutoFlow. All rights reserved.
                    </p>
                    <div className="mt-4 md:mt-0 flex space-x-6">
                        <a href="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
                        <a href="/terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
                        <a href="/cookies" className="text-gray-400 hover:text-white text-sm">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}