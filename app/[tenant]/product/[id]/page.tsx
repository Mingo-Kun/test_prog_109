import { getProduct } from "@/lib/store";
import { notFound } from "next/navigation";
import Tabs from "@/components/Tabs";
import Link from "next/link";
import CheckoutButton from "@/components/CheckoutButton";

export default async function ProductPage({
    params,
}: {
    params: { tenant: string; id: string };
}) {
    const product = await getProduct(params.tenant, params.id);

    if (!product) {
        notFound();
    }

    const tabs = [
        {
            label: "Description",
            content: <p>{product.description}</p>,
        },
        {
            label: "Specifications",
            content: (
                <ul className="list-disc pl-5">
                    <li>ID: {product.id}</li>
                    <li>Price: ${product.price}</li>
                    <li>Stock: {product.stock}</li>
                </ul>
            ),
        },
        {
            label: "Reviews",
            content: <p>No reviews yet.</p>,
        },
    ];

    return (
        <div>
            <div className="mb-6">
                <Link href={`/${params.tenant}`} className="text-blue-500 hover:underline">
                    &larr; Back to Catalog
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                <p className="text-2xl font-semibold text-gray-800 mb-4">${product.price}</p>

                <div className="mb-6">
                    <CheckoutButton tenantId={params.tenant} productId={product.id} initialStock={product.stock} />
                    <span className="ml-4 text-sm text-gray-500">{product.stock} items left</span>
                </div>

                <Tabs tabs={tabs} />
            </div>
        </div>
    );
}
