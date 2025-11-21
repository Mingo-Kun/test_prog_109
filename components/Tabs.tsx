"use client";

import { useState } from "react";

type Tab = {
    label: string;
    content: React.ReactNode;
};

export default function Tabs({ tabs }: { tabs: Tab[] }) {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div>
            <div className="flex border-b mb-4">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`py-2 px-4 font-semibold focus:outline-none ${activeTab === index
                                ? "border-b-2 border-blue-500 text-blue-600"
                                : "text-gray-500 hover:text-gray-700"
                            }`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="p-4 bg-white rounded shadow-sm min-h-[200px]">
                {tabs[activeTab].content}
            </div>
        </div>
    );
}
