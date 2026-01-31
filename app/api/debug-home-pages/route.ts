import { NextRequest, NextResponse } from 'next/server';
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { importMap } from "../../(payload)/admin/importMap";

export async function GET(req: NextRequest) {
    try {
        const payload = await getPayload({ config: configPromise, importMap });
        const homePages = await payload.find({
            collection: 'home-pages',
            limit: 100,
        });
        return NextResponse.json(homePages.docs.map(hp => ({
            id: hp.id,
            siteId: typeof hp.site === 'object' ? (hp.site as any).id : hp.site,
            siteName: typeof hp.site === 'object' ? (hp.site as any).name : 'Unknown',
            heroTitle: hp.hero?.[0]?.title,
            trendingPosts: hp.trending?.posts?.map((p: any) => typeof p === 'object' ? p.title : p),
            featuredCategories: hp.featuredCategories?.categories?.map((c: any) => typeof c === 'object' ? c.name : c)
        })));
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
