"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutButton({
    tenantId,
    productId,
    initialStock,
}: {
    tenantId: string;
    productId: string;
    initialStock: number;
}) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleCheckout = async () => {
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tenantId, productId, quantity: 1 }),
            });

            const data = await res.json();

            if (data.success) {
                setMessage(`Success! New stock: ${data.newStock}`);
                router.refresh(); // Refresh server components to show new stock
            } else {
                setMessage(`Error: ${data.message}`);
            }
        } catch (error) {
            setMessage("Network error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="inline-block">
            <button
                onClick={handleCheckout}
                disabled={loading || initialStock <= 0}
                className={`px-6 py-2 rounded text-white transition-colors ${initialStock > 0
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-400 cursor-not-allowed"
                    }`}
            >
                {loading ? "Processing..." : initialStock > 0 ? "Buy Now" : "Out of Stock"}
            </button>
            {message && <p className="mt-2 text-sm font-semibold">{message}</p>}
        </div>
    );
}
