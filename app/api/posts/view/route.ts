import { getPayload } from "payload";
import configPromise from "@payload-config";
import { importMap } from "@/app/(payload)/admin/importMap";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { postId } = await req.json();

        if (!postId) {
            return NextResponse.json({ error: "PostId is required" }, { status: 400 });
        }

        const payload = await getPayload({ config: configPromise, importMap });

        // Fetch current views
        const post = await payload.findByID({
            collection: "posts",
            id: postId,
        });

        // Increment views
        await payload.update({
            collection: "posts",
            id: postId,
            data: {
                views: (post.views || 0) + 1,
            },
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("View tracking error:", error);
        return NextResponse.json({ error: error.message || "Failed to track view" }, { status: 500 });
    }
}
