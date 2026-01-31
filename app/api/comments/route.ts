import { getPayload } from "payload";
import configPromise from "@payload-config";
import { importMap } from "@/app/(payload)/admin/importMap";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { postId, content, authorName, authorEmail } = await req.json();

        if (!postId || !content) {
            return NextResponse.json({ error: "PostId and content are required" }, { status: 400 });
        }

        const payload = await getPayload({ config: configPromise, importMap });

        const comment = await payload.create({
            collection: "comments",
            data: {
                post: postId,
                content,
                authorName,
                authorEmail,
                status: "pending",
            },
        });

        return NextResponse.json({ success: true, comment });
    } catch (error: any) {
        console.error("Comment submission error:", error);
        return NextResponse.json({ error: error.message || "Failed to submit comment" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const postId = searchParams.get('postId');

        if (!postId) {
            return NextResponse.json({ error: "PostId is required" }, { status: 400 });
        }

        const payload = await getPayload({ config: configPromise, importMap });

        const comments = await payload.find({
            collection: "comments",
            where: {
                and: [
                    {
                        post: {
                            equals: postId,
                        },
                    },
                    {
                        status: {
                            equals: 'approved',
                        },
                    },
                ],
            },
            sort: '-createdAt',
        });

        return NextResponse.json(comments.docs);
    } catch (error: any) {
        console.error("Comment fetch error:", error);
        return NextResponse.json({ error: error.message || "Failed to fetch comments" }, { status: 500 });
    }
}
