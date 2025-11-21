import { decrementStock } from "@/lib/store";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    const { tenantId, productId, quantity } = body;

    if (!tenantId || !productId || !quantity) {
        return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 });
    }

    // Simulate race condition by adding a delay inside the critical section (in store.ts)
    // The decrementStock function already has a delay.

    const result = await decrementStock(tenantId, productId, quantity);

    if (result.success) {
        return NextResponse.json(result);
    } else {
        return NextResponse.json(result, { status: 400 });
    }
}
