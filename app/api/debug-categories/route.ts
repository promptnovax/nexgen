import { NextRequest, NextResponse } from 'next/server';
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { importMap } from "../../(payload)/admin/importMap";

export async function GET(req: NextRequest) {
    try {
        const payload = await getPayload({ config: configPromise, importMap });
        const categories = await payload.find({
            collection: 'categories',
            limit: 100,
        });
        return NextResponse.json(categories.docs.map(cat => ({
            id: cat.id,
            name: cat.name,
            siteId: typeof cat.site === 'object' ? (cat.site as any).id : cat.site,
            siteName: typeof cat.site === 'object' ? (cat.site as any).name : 'Unknown'
        })));
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
