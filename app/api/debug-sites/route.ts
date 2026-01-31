import { NextRequest, NextResponse } from 'next/server';
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { importMap } from "../../(payload)/admin/importMap";

export async function GET(req: NextRequest) {
    try {
        const payload = await getPayload({ config: configPromise, importMap });
        const sites = await payload.find({
            collection: 'sites',
            limit: 100,
        });
        return NextResponse.json(sites.docs);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
