import { getTenantData } from "@/lib/store";
import Link from "next/link";

// Revalidate every 60 seconds (ISR)
export const revalidate = 60;

export default async function CatalogPage({
    params,
}: {
    params: { tenant: string };
}) {
    const tenantData = await getTenantData(params.tenant);

    if (!tenantData) {
        // Should be handled by layout, but safe to check
        return <div>Tenant not found</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Product Catalog</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tenantData.products.map((product) => (
                    <Link
                        key={product.id}
                        href={`/${params.tenant}/product/${product.id}`}
                        className="block border rounded-lg p-4 hover:shadow-lg transition-shadow bg-white"
                    >
                        <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-bold">${product.price}</span>
                            <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
