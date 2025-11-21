import { getTenantData } from "@/lib/store";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function TenantLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { tenant: string };
}) {
    const tenantData = await getTenantData(params.tenant);

    if (!tenantData) {
        notFound();
    }

    return (
        <div className={`min-h-screen bg-gray-50`}>
            <header className={`p-4 text-white bg-${tenantData.theme.primaryColor}`}>
                <div className="container mx-auto flex justify-between items-center">
                    <Link href={`/${params.tenant}`} className="text-xl font-bold">
                        {tenantData.name}
                    </Link>
                    <nav>
                        <span className="text-sm">Tenant: {params.tenant}</span>
                    </nav>
                </div>
            </header>
            <main className="container mx-auto p-4">{children}</main>
        </div>
    );
}
