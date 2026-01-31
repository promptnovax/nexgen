import { NextRequest, NextResponse } from 'next/server';
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { importMap } from "../../(payload)/admin/importMap";

export async function GET(req: NextRequest) {
    try {
        const payload = await getPayload({ config: configPromise, importMap });
        const posts = await payload.find({
            collection: 'posts',
            limit: 100,
        });
        return NextResponse.json(posts.docs.map(post => ({
            id: post.id,
            title: post.title,
            siteId: typeof post.site === 'object' ? (post.site as any).id : post.site,
            siteName: typeof post.site === 'object' ? (post.site as any).name : 'Unknown'
        })));
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
