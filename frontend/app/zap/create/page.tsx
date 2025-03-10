"use client";

import { BACKEND_URL } from "@/app/config";
import { Appbar } from "@/components/Appbar";
import { PrimaryButton } from "@/components/button/PrimaryButton";
import { Input } from "@/components/Input";
import { ZapCell } from "@/components/ZapCell";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function useAvailableActionsAndTriggers() {
    const [availableActions, setAvailableActions] = useState([]);
    const [availableTriggers, setAvailableTriggers] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/trigger/available`)
            .then(x => setAvailableTriggers(x.data.availableTriggers))

        axios.get(`${BACKEND_URL}/api/v1/action/available`)
            .then(x => setAvailableActions(x.data.availableActions))
    }, [])

    return {
        availableActions,
        availableTriggers
    }
}

export default function() {
    const router = useRouter();
    const { availableActions, availableTriggers } = useAvailableActionsAndTriggers();
    const [selectedTrigger, setSelectedTrigger] = useState<{
        id: string;
        name: string;
    }>();

    const [selectedActions, setSelectedActions] = useState<{
        index: number;
        availableActionId: string;
        availableActionName: string;
        metadata: any;
    }[]>([]);
    const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(null);

    return <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200">
        <Appbar />
        <div className="flex justify-end bg-white shadow-sm p-4 sticky top-0 z-10">
            <PrimaryButton 
                onClick={async () => {
                    if (!selectedTrigger?.id) {
                        return;
                    }

                    const response = await axios.post(`${BACKEND_URL}/api/v1/zap`, {
                        "availableTriggerId": selectedTrigger.id,
                        "triggerMetadata": {},
                        "actions": selectedActions.map(a => ({
                            availableActionId: a.availableActionId,
                            actionMetadata: a.metadata
                        }))
                    }, {
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    })
                    router.push("/dashboard");
                }}
            >
                Publish
            </PrimaryButton>
        </div>
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">Create Your Zap</h1>
                
                <div className="w-full flex flex-col items-center space-y-8">
                    {/* Trigger section */}
                    <div className="w-full max-w-md">
                        <h2 className="text-sm uppercase tracking-wider text-gray-500 text-center mb-3">Select a Trigger</h2>
                        <div className="flex justify-center w-full relative">
                            <ZapCell 
                                onClick={() => {
                                    setSelectedModalIndex(1);
                                }} 
                                name={selectedTrigger?.name ? selectedTrigger.name : "Trigger"} 
                                index={1} 
                            />
                        </div>
                    </div>
                    
                    {/* Connection line */}
                    {selectedTrigger && selectedActions.length > 0 && (
                        <div className="h-10 w-0.5 bg-blue-400"></div>
                    )}
                    
                    {/* Actions section */}
                    <div className="w-full max-w-md space-y-6">
                        {selectedActions.length > 0 && (
                            <h2 className="text-sm uppercase tracking-wider text-gray-500 text-center mb-2">Actions</h2>
                        )}
                        
                        {selectedActions.map((action, index) => (
                            <div key={index} className="space-y-4">
                                <div className="flex justify-center">
                                    <ZapCell 
                                        onClick={() => {
                                            setSelectedModalIndex(action.index);
                                        }} 
                                        name={action.availableActionName ? action.availableActionName : "Action"} 
                                        index={action.index} 
                                    />
                                </div>
                                {index < selectedActions.length - 1 && (
                                    <div className="flex justify-center">
                                        <div className="h-10 w-0.5 bg-blue-400"></div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    
                    {/* Add action button */}
                    <div className="flex justify-center mt-6">
                        <button 
                            onClick={() => {
                                setSelectedActions(a => [...a, {
                                    index: a.length + 2,
                                    availableActionId: "",
                                    availableActionName: "",
                                    metadata: {}
                                }])
                            }}
                            className="rounded-full bg-blue-500 hover:bg-blue-600 text-white w-12 h-12 flex items-center justify-center shadow-lg transition-all hover:shadow-xl hover:scale-110"
                        >
                            <div className="text-2xl">+</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        {selectedModalIndex && (
            <Modal 
                availableItems={selectedModalIndex === 1 ? availableTriggers : availableActions} 
                onSelect={(props: null | { name: string; id: string; metadata: any; }) => {
                    if (props === null) {
                        setSelectedModalIndex(null);
                        return;
                    }
                    if (selectedModalIndex === 1) {
                        setSelectedTrigger({
                            id: props.id,
                            name: props.name
                        })
                    } else {
                        setSelectedActions(a => {
                            let newActions = [...a];
                            newActions[selectedModalIndex - 2] = {
                                index: selectedModalIndex,
                                availableActionId: props.id,
                                availableActionName: props.name,
                                metadata: props.metadata
                            }
                            return newActions
                        })
                    }
                    setSelectedModalIndex(null);
                }} 
                index={selectedModalIndex} 
            />
        )}
    </div>
}

function Modal({ index, onSelect, availableItems }: { index: number, onSelect: (props: null | { name: string; id: string; metadata: any; }) => void, availableItems: {id: string, name: string, image: string;}[] }) {
    const [step, setStep] = useState(0);
    const [selectedAction, setSelectedAction] = useState<{
        id: string;
        name: string;
    }>();
    const isTrigger = index === 1;

    return (
        <div className="fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50 flex overflow-y-auto p-4">
            <div className="relative p-0 w-full max-w-2xl mx-auto my-auto">
                <div className="relative bg-white rounded-lg shadow-2xl">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <div className="text-xl font-semibold text-gray-800">
                            {step === 0 
                                ? `Select ${index === 1 ? "Trigger" : "Action"}`
                                : `Configure ${selectedAction?.name}`
                            }
                        </div>
                        <button 
                            onClick={() => {
                                onSelect(null);
                            }} 
                            type="button" 
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full p-1.5 inline-flex items-center justify-center"
                        >
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                        {step === 1 && selectedAction?.id === "email" && (
                            <EmailSelector setMetadata={(metadata) => {
                                onSelect({
                                    ...selectedAction,
                                    metadata
                                })
                            }} />
                        )}

                        {(step === 1 && selectedAction?.id === "send-sol") && (
                            <SolanaSelector setMetadata={(metadata) => {
                                onSelect({
                                    ...selectedAction,
                                    metadata
                                })
                            }} />
                        )}

                        {step === 0 && (
                            <div className="grid gap-3">
                                {availableItems.map(({id, name, image}) => {
                                    return (
                                        <div 
                                            key={id}
                                            onClick={() => {
                                                if (isTrigger) {
                                                    onSelect({
                                                        id,
                                                        name,
                                                        metadata: {}
                                                    })
                                                } else {
                                                    setStep(s => s + 1);
                                                    setSelectedAction({
                                                        id,
                                                        name
                                                    })
                                                }
                                            }} 
                                            className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer hover:bg-slate-50 transition-colors"
                                        >
                                            <img src={image} width={40} height={40} alt={name} className="rounded-full object-cover" /> 
                                            <div className="flex flex-col justify-center font-medium"> 
                                                {name} 
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                    
                    {/* Footer with back button when in configuration step */}
                    {step === 1 && (
                        <div className="border-t p-4">
                            <button 
                                onClick={() => setStep(0)}
                                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to selection
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function EmailSelector({setMetadata}: {
    setMetadata: (params: any) => void;
}) {
    const [email, setEmail] = useState("");
    const [body, setBody] = useState("");

    return (
        <div className="space-y-4">
            <Input 
                label={"To"} 
                type={"text"} 
                placeholder="com.email" 
                onChange={(e) => setEmail(e.target.value)}
            />
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
                <textarea 
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" 
                    placeholder="Email content..."
                    rows={4}
                    onChange={(e) => setBody(e.target.value)}
                ></textarea>
            </div>
            <div className="pt-4 flex justify-end">
                <PrimaryButton 
                    onClick={() => {
                        setMetadata({
                            email,
                            body
                        })
                    }}
                >
                    Submit
                </PrimaryButton>
            </div>
        </div>
    )
}

function SolanaSelector({setMetadata}: {
    setMetadata: (params: any) => void;
}) {
    const [amount, setAmount] = useState("");
    const [address, setAddress] = useState("");    

    return (
        <div className="space-y-4">
            <Input 
                label={"Wallet Address"} 
                type={"text"} 
                placeholder="com.address" 
                onChange={(e) => setAddress(e.target.value)}
            />
            <Input 
                label={"Amount"} 
                type={"text"} 
                placeholder="com.amount" 
                onChange={(e) => setAmount(e.target.value)}
            />
            <div className="pt-4 flex justify-end">
                <PrimaryButton 
                    onClick={() => {
                        setMetadata({
                            amount,
                            address
                        })
                    }}
                >
                    Submit
                </PrimaryButton>
            </div>
        </div>
    )
}