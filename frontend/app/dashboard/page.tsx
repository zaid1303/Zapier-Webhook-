"use client"
import { Appbar } from "@/components/Appbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL, HOOKS_URL } from "../config";
import { useRouter } from "next/navigation";
import { DarkButton } from "@/components/button/DarkButton";
import { LinkButton } from "@/components/button/LinkButton";
import { Calendar, ExternalLink, Loader } from "lucide-react";

interface Zap {
    "id": string,
    "triggerId": string,
    "userId": number,
    "actions": {
        "id": string,
        "zapId": string,
        "actionId": string,
        "sortingOrder": number,
        "type": {
            "id": string,
            "name": string
            "image": string
        }
    }[],
    "trigger": {
        "id": string,
        "zapId": string,
        "triggerId": string,
        "type": {
            "id": string,
            "name": string,
            "image": string
        }
    }
}

function useZaps() {
    const [loading, setLoading] = useState(true);
    const [zaps, setZaps] = useState<Zap[]>([]);
    const router=useRouter();

    useEffect(() => {
        const token=localStorage.getItem('token');
        if(!token){
            router.push('/');
            return ;
        }


        axios.get(`${BACKEND_URL}/api/v1/zap`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then(res => {
                setZaps(res.data.zaps);
                setLoading(false)
            })
            .catch(err => {
                console.error("Failed to fetch zaps:", err);
                setLoading(false);
            });
    }, [router]);

    return {
        loading, zaps
    }
}

export default function() {
    const { loading, zaps } = useZaps();
    const router = useRouter();
    
    return (
        <div className="min-h-screen bg-gray-50">
            <Appbar />
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                        My Zaps
                    </h1>
                    <DarkButton 
                        onClick={() => router.push("/zap/create")}
                    >
                        <span className="hidden sm:inline">Create New Zap</span>
                        <span className="sm:hidden">Create</span>
                    </DarkButton>
                </div>
                
                {loading ? (
                    <div className="flex justify-center items-center py-16">
                        <Loader className="w-8 h-8 animate-spin text-blue-500" />
                        <span className="ml-3 text-lg text-gray-600">Loading your zaps...</span>
                    </div>
                ) : (
                    <ZapTable zaps={zaps} />
                )}
            </div>
        </div>
    )
}

function ZapTable({ zaps }: {zaps: Zap[]}) {
    const router = useRouter();

    if (zaps.length === 0) {
        return (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                <div className="text-gray-500 mb-4">You don't have any zaps yet</div>
                <DarkButton onClick={() => router.push("/zap/create")}>
                    Create Your First Zap
                </DarkButton>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Desktop header */}
            <div className="hidden md:flex border-b border-gray-200 bg-gray-50 px-6 py-3 text-sm font-medium text-gray-500">
                <div className="w-1/4 lg:w-1/4">Integration</div>
                <div className="w-1/6 lg:w-1/5">ID</div>
                <div className="w-1/6 lg:w-1/5">Created</div>
                <div className="w-1/4 lg:w-1/4">Webhook URL</div>
                {/* <div className="w-1/12 lg:w-1/12 text-right">Action</div> */}
            </div>
            
            {/* Zap rows */}
            <div className="divide-y divide-gray-200">
                {zaps.map(zap => (
                    <div 
                        key={zap.id} 
                        className="hover:bg-gray-50 transition-colors duration-150"
                    >
                        {/* Desktop row */}
                        <div className="hidden md:flex px-6 py-4 items-center">
                            <div className="w-1/3 lg:w-1/4">
                                <div className="flex items-center space-x-2">
                                    <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
                                        <img 
                                            src={zap.trigger.type.image} 
                                            alt={zap.trigger.type.name}
                                            className="w-6 h-6 rounded"
                                        />
                                        {zap.actions.map(action => (
                                            <img 
                                                key={action.id}
                                                src={action.type.image} 
                                                alt={action.type.name}
                                                className="w-6 h-6 rounded" 
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600 truncate">
                                        {`${zap.trigger.type.name} → ${zap.actions.map(a => a.type.name).join(', ')}`}
                                    </span>
                                </div>
                            </div>
                            <div className="w-1/6 lg:w-1/5 font-mono text-xs text-gray-500 truncate">
                                {zap.id.substring(0, 8)}...
                            </div>
                            <div className="w-1/6 lg:w-1/5 text-sm text-gray-600 flex items-center">
                                <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                                Nov 13, 2024
                            </div>
                            <div className="w-1/4 lg:w-1/4 text-xs text-gray-500">
                                <div className="flex items-center">
                                    <div className="truncate">{`${HOOKS_URL}/hooks/catch/1/${zap.id}`}</div>
                                    <button 
                                        onClick={() => navigator.clipboard.writeText(`${HOOKS_URL}/hooks/catch/1/${zap.id}`)}
                                        className="ml-1 p-1 text-gray-400 hover:text-blue-500"
                                        title="Copy webhook URL"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        {/* Mobile card view */}
                        <div className="md:hidden p-4">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                    <div className="flex items-center space-x-1 bg-gray-100 p-1 rounded-lg">
                                        <img 
                                            src={zap.trigger.type.image} 
                                            alt={zap.trigger.type.name}
                                            className="w-6 h-6 rounded" 
                                        />
                                        {zap.actions.map(action => (
                                            <img 
                                                key={action.id}
                                                src={action.type.image} 
                                                alt={action.type.name}
                                                className="w-6 h-6 rounded" 
                                            />
                                        ))}
                                    </div>
                                </div>
                                <LinkButton 
                                    onClick={() => router.push(`/zap/${zap.id}`)}
                                >
                                    View <ExternalLink className="ml-1 w-3 h-3" />
                                </LinkButton>
                            </div>
                            
                            <div className="text-xs space-y-2 text-gray-600">
                                <div className="flex justify-between">
                                    <span className="font-medium">ID:</span>
                                    <span className="font-mono">{zap.id.substring(0, 12)}...</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium">Created:</span>
                                    <span>Nov 13, 2024</span>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="font-medium">Webhook URL:</span>
                                        <button 
                                            onClick={() => navigator.clipboard.writeText(`${HOOKS_URL}/hooks/catch/1/${zap.id}`)}
                                            className="text-blue-500 flex items-center"
                                        >
                                            Copy <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="truncate bg-gray-50 p-2 rounded text-gray-500 text-xs">
                                        {`${HOOKS_URL}/hooks/catch/1/${zap.id}`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}