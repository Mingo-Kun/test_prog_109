
export type Product = {
    id: string;
    name: string;
    price: number;
    description: string;
    stock: number;
};

export type TenantData = {
    name: string;
    theme: {
        primaryColor: string;
    };
    products: Product[];
};

// Mock Data Store
const STORE: Record<string, TenantData> = {
    'brand-a': {
        name: 'Brand A',
        theme: { primaryColor: 'blue-600' },
        products: [
            { id: 'p1', name: 'Brand A Product 1', price: 100, description: 'Description for A1', stock: 10 },
            { id: 'p2', name: 'Brand A Product 2', price: 200, description: 'Description for A2', stock: 5 },
        ],
    },
    'brand-b': {
        name: 'Brand B',
        theme: { primaryColor: 'red-600' },
        products: [
            { id: 'p3', name: 'Brand B Product 1', price: 150, description: 'Description for B1', stock: 20 },
            { id: 'p4', name: 'Brand B Product 2', price: 250, description: 'Description for B2', stock: 3 },
        ],
    },
};

// Helper to simulate database delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getTenantData(tenantId: string): Promise<TenantData | null> {
    // Simulate DB call
    await delay(50);

    // STRICT ISOLATION: Only return data if tenantId matches exactly a key in the store.
    // In a real DB, this would be `WHERE tenant_id = ?`.
    if (!STORE[tenantId]) {
        return null;
    }

    // Return a deep copy to prevent mutation of the "DB" from outside
    return JSON.parse(JSON.stringify(STORE[tenantId]));
}

export async function getProduct(tenantId: string, productId: string): Promise<Product | null> {
    const tenantData = await getTenantData(tenantId);
    if (!tenantData) return null;

    const product = tenantData.products.find(p => p.id === productId);
    return product || null;
}

// For checkout simulation
export async function decrementStock(tenantId: string, productId: string, quantity: number): Promise<{ success: boolean; message: string; newStock?: number }> {
    // await delay(100); // Moved inside to simulate race

    const tenantData = STORE[tenantId];
    if (!tenantData) return { success: false, message: 'Tenant not found' };

    const product = tenantData.products.find(p => p.id === productId);
    if (!product) return { success: false, message: 'Product not found' };

    if (product.stock < quantity) {
        return { success: false, message: 'Insufficient stock' };
    }

    // Simulate race condition: Yield here so other requests can pass the check
    await delay(50);

    product.stock -= quantity;
    return { success: true, message: 'Order placed', newStock: product.stock };
}
