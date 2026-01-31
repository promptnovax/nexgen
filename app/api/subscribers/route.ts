import { getPayload } from "payload";
import configPromise from "@payload-config";
import { importMap } from "@/app/(payload)/admin/importMap";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, siteId } = await req.json();

        if (!email || !siteId) {
            return NextResponse.json({ error: "Email and siteId are required" }, { status: 400 });
        }

        const payload = await getPayload({ config: configPromise, importMap });

        await payload.create({
            collection: "subscribers",
            data: {
                email,
                site: siteId,
                status: "subscribed",
            },
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("Subscription error:", error);
        return NextResponse.json({ error: error.message || "Failed to subscribe" }, { status: 500 });
    }
}
